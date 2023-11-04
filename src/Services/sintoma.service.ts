import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { Crud } from 'src/Interfaces/crud.interface';
import { HttpResponse, badRequest, serviceError, created, success, noContent } from 'src/Types/HttpResponse';
import { SintomaDto } from 'src/Models/SIntoma/SintomaDto';
import { Sintoma } from 'src/Models/SIntoma/Sintoma';

@Injectable()
export class SintomaService implements Crud {
    constructor(private readonly prisma: PrismaConfig) { }

    async Create(data: SintomaDto): Promise<HttpResponse> {
        try{
            const { descricao, idosoId, ocorrencia } = data; // Desestruturação dos elementos\

            const sintoma = await this.prisma.sintoma.findFirst({
                where: {
                    descricao: descricao,
                    idosoId: idosoId
                }
            });

            if (sintoma){
                const sintomaInstance = new Sintoma(descricao, idosoId, sintoma.ocorrencia);
                sintomaInstance.adcionarOcorrencia(ocorrencia);
                const {statusCode, body} = await this.Update(sintomaInstance, sintoma.id);
                
                if (statusCode == 200){
                    return success(body);
                }else{
                    return badRequest();
                }
            }else{
                const sintoma = await this.prisma.sintoma.create({
                    data: {
                        descricao: descricao,
                        ocorrencia: [ocorrencia],
                        idosoId: idosoId
                    }
                });

                return created(sintoma);
            }
        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async Read(id: string): Promise<HttpResponse> {
        try{
            const sintoma = await this.prisma.sintoma.findUnique({
                where: {
                    id: id
                }
            });

            return success(sintoma);
        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    async Update(data: any, id: string): Promise<HttpResponse> {
        try{
            const {statusCode, body} = await this.Read(id);

            if (statusCode == 200){
                const { descricao, ocorrencia } = data; // Desestruturação dos elementos\

                const sintomaAtulizado = await this.prisma.sintoma.update({
                    data: {
                        descricao: descricao,
                        ocorrencia: ocorrencia
                    },
                    where: {
                        id
                    }
                });

                return success(sintomaAtulizado);
            }else{
                return badRequest();
            }

        }catch (error) {
            console.error(error);
            return serviceError(error);
        }
    }

    Delete(id: string): Promise<HttpResponse> {
        throw new Error('Method not implemented.');
    }
}
