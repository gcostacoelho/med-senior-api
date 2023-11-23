import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { Crud } from 'src/Interfaces/crud.interface';
import { HttpResponse, badRequest, serviceError, created, success, noContent, notFound } from 'src/Types/HttpResponse';
import { Medicacao } from '../Models/Medicacao/Medicacao';
import { MedicacaoDto } from 'src/Models/Medicacao/MedicacaoDto';

@Injectable()
export class MedicacaoService implements Crud {
    constructor(
        private readonly prisma: PrismaConfig
    ) { }

    async Create(data: MedicacaoDto): Promise<HttpResponse> {
        try{
            const { nome, modoAdm, descricao, idosoId} = data; // Desestruturação dos elementos\

            const idoso = await this.prisma.idoso.findUnique({
                where: {
                    id: idosoId
                }
            });

            if (idoso){
                const medicacao = await this.prisma.medicacao.create({
                    data: {
                        nome: nome,
                        modoAdm: modoAdm,
                        descricao: descricao,
                        falhas: [],
                        idosoId: idosoId,
                        estoque: 0
                    }
                });
    
                return created(medicacao);
            }else {
                return badRequest();
            }
            
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
                    idosoId: id
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
                await this.prisma.medicacao.delete({
                    where: {
                        id
                    }
                });

                return noContent();
            }else{
                return badRequest();
            }

        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async aumentarEstoque(id: string, qtd: string): Promise<HttpResponse>{
        try{
            const {statusCode, body} = await this.Read(id);

            if (statusCode == 200){
                const medicacao = new Medicacao(body.nome, body.modoAdm, body.descricao, body.idosoId, body.falhas, body.estoque);
                medicacao.aumentarEstoque(parseInt(qtd));
                
                const medicaoAtulizado = await this.prisma.medicacao.update({
                    data: {
                        nome: medicacao.nome,
                        modoAdm: medicacao.modoAdm,
                        descricao: medicacao.descricao,
                        falhas: medicacao.falhas,
                        estoque: medicacao.estoque
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

    async diminuirEstoque(id: string, qtd: string): Promise<HttpResponse>{
        try{
            const {statusCode, body} = await this.Read(id);

            if (statusCode == 200){
                const medicacao = new Medicacao(body.nome, body.modoAdm, body.descricao, body.idosoId, body.falhas, body.estoque);
                
                const respDominuir = medicacao.diminuirEstoque(parseInt(qtd));

                if (respDominuir){
                    const medicaoAtulizado = await this.prisma.medicacao.update({
                        data: {
                            nome: medicacao.nome,
                            modoAdm: medicacao.modoAdm,
                            descricao: medicacao.descricao,
                            falhas: medicacao.falhas,
                            estoque: medicacao.estoque
                        },
                        where: {
                            id
                        }
                    });
    
                    return success(medicaoAtulizado);
                }else{
                    return notFound(`Não existe estoque para o medicamento ${body.nome}`);
                }
                
            }else{
                return badRequest();
            }

        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }
}
