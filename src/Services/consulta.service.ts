import { Injectable } from '@nestjs/common';
import { getDaysOfWeek } from '../utils/daysOfWeek';
import { Sintoma } from '../Models/SIntoma/Sintoma';
import { PrismaConfig } from '../Configs/prismaConfig';
import { Crud } from '../Interfaces/crud.interface';
import { ConsultaDto } from '../Models/Consulta/ConsultaDto';
import { HttpResponse, badRequest, created, noContent, serviceError, success } from '../Types/HttpResponse';
import { NotificacaoService } from './notificacao.service';
import { cronPatternConsult } from 'src/utils/cronPatterns';
import { Consulta } from 'src/Models/Consulta/Consulta';

@Injectable()
export class ConsultaService implements Crud {
    constructor(
        private readonly prisma: PrismaConfig,
        private readonly notificacaoService: NotificacaoService
    ) { }

    async Create(data: ConsultaDto): Promise<HttpResponse> {
        try {
            const consulta = await this.prisma.consulta.create({
                data,
            });

            const cronPattern = cronPatternConsult(data.dataHoraConsulta);

            console.log(cronPattern);
            try {
                await this.notificacaoService.createCronJob(data.idosoId, cronPattern, `Sua consulta médica com o Dr. ${consulta.medico} está agendada para hoje`, `${consulta.id}-${data.especialidade}-${data.medico}`);
            } catch (error) {
                console.log(error);
            }

            return created(consulta);
        } catch (error) {
            serviceError(error);
        }
    }

    async Read(id: string): Promise<HttpResponse> {
        try {
            const consulta = await this.prisma.consulta.findMany({
                where: {
                    idosoId: id
                },
                orderBy: {
                    dataHoraConsulta: 'asc',
                },
            });

            return success(consulta);
        } catch (error) {
            return serviceError(error);
        }
    }

    async readWeekData(id: string): Promise<HttpResponse> {
        try {
            const diasDaSemana = getDaysOfWeek(new Date());
            const { statusCode, body } = await this.Read(id);

            if (statusCode == 200) {
                let listaConsultas = [];

                body.forEach(element => {
                    const consulta = new Consulta(element.dataHoraConsulta, element.local, element.especialidade, element.idosoId, element.medico, element.documentos);

                    const respData = consulta.verificarSemana(diasDaSemana);

                    if (respData) {
                        listaConsultas.push(consulta);
                    }
                });

                return success(listaConsultas);
            }else{
                noContent();
            }
        } catch (error) {
            return serviceError(error);
        }
    }

    async ReadSpecified(id: string): Promise<HttpResponse> {
        try {
            const consultaEspecifica = await this.prisma.consulta.findUnique({
                where: {
                    id
                }
            });

            return success(consultaEspecifica);
        } catch (error) {
            return serviceError(error);
        }
    }

    async Update(data: ConsultaDto, id: string): Promise<HttpResponse> {
        try {
            const consultaExiste = await this.ReadSpecified(id);

            if (consultaExiste.statusCode != 200) {
                return badRequest();
            }

            const { dataHoraConsulta, local, especialidade, medico, documentos } = data;

            const consultaAtualizada = await this.prisma.consulta.update({
                data: {
                    dataHoraConsulta,
                    local,
                    especialidade,
                    medico,
                    documentos
                },
                where: { id }
            });

            return success(consultaAtualizada);
        } catch (error) {
            return serviceError(error);
        }
    }

    async Delete(id: string): Promise<HttpResponse> {
        try {
            const consultaExiste = await this.ReadSpecified(id);

            if (consultaExiste.statusCode != 200) {
                return badRequest();
            }

            await this.prisma.consulta.delete({
                where: { id }
            });

            try {
                this.notificacaoService.deleteCronJob(`${consultaExiste.body.id}-${consultaExiste.body.especialidade}-${consultaExiste.body.medico}`);
            } catch (error) {
                console.log("Não possui job");
                
            }

            return noContent();
        } catch (error) {
            return serviceError(error);
        }
    }
}
