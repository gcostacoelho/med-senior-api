import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { Crud } from 'src/Interfaces/crud.interface';
import { UsoMedicacaoDto } from 'src/Models/UsoMedicacao/UsoMedicacaoDto';
import { UsoMedicacao } from '../Models/UsoMedicacao/UsoMedicacao';
import { HttpResponse, badRequest, created, noContent, serviceError, success } from 'src/Types/HttpResponse';
import { MedicacaoService } from './medicacao.service';
import { cronPatternUsoMedicacao } from 'src/utils/cronPatterns';
import { NotificacaoService } from './notificacao.service';

@Injectable()
export class UsoMedicacaoService implements Crud {
    constructor(
        private readonly prisma: PrismaConfig,
        private readonly medicacao: MedicacaoService,
        private readonly notificacaoService: NotificacaoService
    ) { }

    async Create(data: UsoMedicacaoDto): Promise<HttpResponse> {
        try {
            const { dosagem, intervalo, horaInicial, dataFinal, medId, idosoId } = data; // Desestruturação dos elementos\

            const UsoMedicacao = await this.prisma.usoMedicacao.create({
                data: {
                    dosagem,
                    intervalo,
                    horaInicial,
                    dataFinal,
                    idosoId,
                    medId
                }
            });

            const cronPattern = cronPatternUsoMedicacao(intervalo);
            const medicacao = await this.medicacao.Read(medId);
            const nomeMedicacao = medicacao.body.nome;

            await this.notificacaoService.createCronJob(idosoId, cronPattern, `Está na hora de tomar a medicação ${nomeMedicacao}`, `idMed-${medId}`);

            return created(UsoMedicacao);
        } catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async Read(id: string): Promise<HttpResponse> {
        try {
            const usoMedicacao = await this.prisma.usoMedicacao.findUnique({
                include: {
                    medicacao: true
                },
                where: {
                    id: id
                }
            });

            return success(usoMedicacao);
        } catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async readAllData(idosoId: string) {
        try {
            const usoMedicacoesIdoso = await this.prisma.usoMedicacao.findMany({
                include: {
                    medicacao: true
                },
                where: {
                    idosoId: idosoId
                }
            })

            return success(usoMedicacoesIdoso);
        } catch (error) {
            serviceError(error);
        }
    }

    async readDayData(idosoId: string) {
        try {
            const { statusCode, body } = await this.readAllData(idosoId);

            let listagemMed = [];

            if (statusCode == 200) {
                body.forEach(element => {
                    const usoMedicacao = new UsoMedicacao(element.dosagem, element.intervalo, element.horaInicial, element.idosoId, element.dataFinal, element.medicacao);

                    const respDia = usoMedicacao.calcularDia();

                    if (respDia) {
                        listagemMed.push(usoMedicacao)
                    }
                });
            }
            return success(listagemMed);
        } catch (error) {
            serviceError(error);
        }
    }

    async Update(data: UsoMedicacaoDto, id: string): Promise<HttpResponse> {
        try {
            const { statusCode, body } = await this.Read(id);

            if (statusCode == 200) {
                const { dosagem, intervalo, horaInicial, dataFinal, medId } = data; // Desestruturação dos elementos\

                const usoMedicaoAtulizado = await this.prisma.usoMedicacao.update({
                    data: {
                        dosagem,
                        intervalo,
                        horaInicial,
                        dataFinal,
                        medId
                    },
                    where: {
                        id
                    }
                });

                return success(usoMedicaoAtulizado);
            } else {
                return badRequest();
            }

        } catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async Delete(id: string): Promise<HttpResponse> {
        try {
            const { body, statusCode } = await this.Read(id);

            if (statusCode == 200) {
                await this.prisma.usoMedicacao.delete({
                    where: {
                        id
                    }
                });

                console.log(body);
                
                this.notificacaoService.deleteCronJob(`idMed-${body.medId}`);

                return noContent();
            } else {
                return badRequest();
            }

        } catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }
}
