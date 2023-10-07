import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { Crud } from 'src/Interfaces/crud.interface';
import { UsoMedicacaoDto } from 'src/Models/UsoMedicacao/UsoMedicacaoDto';
import { HttpResponse, badRequest, created, noContent, serviceError, success } from 'src/Types/HttpResponse';
import { MedicacaoService } from './medicacao.service';

@Injectable()
export class UsoMedicacaoService implements Crud {
    constructor(
        private readonly prisma: PrismaConfig,
        private readonly medicacao: MedicacaoService
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

            return created(UsoMedicacao);
        } catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async Read(id: string): Promise<HttpResponse> {
        try {
            const usoMedicacao = await this.prisma.usoMedicacao.findUnique({
                include:{
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
            const { statusCode } = await this.Read(id);

            if (statusCode == 200) {
                await this.prisma.usoMedicacao.delete({
                    where: {
                        id
                    }
                });

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
