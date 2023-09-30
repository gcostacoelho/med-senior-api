import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { Crud } from 'src/Interfaces/crud.interface';
import { HttpResponse, badRequest, serviceError, created, success } from 'src/Types/HttpResponse';
import { Medicacao } from '../Models/Medicacao/Medicacao';
import { MedicacaoDto } from 'src/Models/Medicacao/MedicacaoDto';

@Injectable()
export class MedicacaoService implements Crud {
    constructor(
        private readonly prisma: PrismaConfig
    ) { }

    async Create(data: MedicacaoDto): Promise<HttpResponse> {
        try{
            const { nome, modoAdm, descricao, idosoCodigo} = data; // Desestruturação dos elementos\

            const medicacao = await this.prisma.medicacao.create({
                data: {
                    nome: nome,
                    modoAdm: modoAdm,
                    descricao: descricao,
                    falhas: [],
                    idosoCodigo: idosoCodigo
                }
            });

            return created(medicacao);
        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async Read(id: string): Promise<HttpResponse> {
        try{
            const medicacao = await this.prisma.medicacao.findUnique({
                where: {
                    id: id
                }
            });

            return success(medicacao);
        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async ReadAllMedicines(id: string): Promise<HttpResponse> {
        try{
            const medicacao = await this.prisma.medicacao.findMany({
                where: {
                    idosoCodigo: id
                }
            });

            return success(medicacao);
        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async Update(data: MedicacaoDto, id: string): Promise<HttpResponse> {
        try{
            const {statusCode, body} = await this.Read(id);

            if (statusCode == 200){
                const { nome, modoAdm, descricao} = data; // Desestruturação dos elementos\

                const medicaoAtulizado = await this.prisma.medicacao.update({
                    data: {
                        nome: nome,
                        modoAdm: modoAdm,
                        descricao: descricao,
                    },
                    where: {
                        id
                    }
                });

                return success(medicaoAtulizado);
            }else{
                return badRequest();
            }

        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async Delete(id: string): Promise<HttpResponse> {
        try{
            const {statusCode, body} = await this.Read(id);

            if (statusCode == 200){
                const medicaoDeletada = await this.prisma.medicacao.delete({
                    where: {
                        id
                    }
                });

                return success(medicaoDeletada);
            }else{
                return badRequest();
            }

        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    AumentarEstoque(id: string, qtd: number): Promise<HttpResponse>{
        throw new Error('Method not implemented.');
    }
}
