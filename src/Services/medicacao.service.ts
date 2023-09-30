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

    ReadAllMedicines(id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }

    Update(data: Object, id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
    Delete(id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }

    AumentarEstoque(id: string, qtd: number): Promise<HttpResponse>{
        throw new Error('Method not implemented.');
    }
}
