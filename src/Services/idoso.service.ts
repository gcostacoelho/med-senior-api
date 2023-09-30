import { Injectable } from '@nestjs/common';
import { PrismaConfig } from '../Configs/prismaConfig';
import { Crud } from '../Interfaces/crud.interface';
import { Idoso } from '../Models/Idoso/Idoso';
import { IdosoDto } from '../Models/Idoso/Dtos/IdosoDto';
import { HttpResponse, badRequest, created, noContent, serviceError, success } from '../Types/HttpResponse';
import { generateRandomCode } from '../utils/randomCode';
import { LoginService } from './login.service';
import { IdosoDtoWithoutPass } from 'src/Models/Idoso/Dtos/IdosoDtoWithoutPass';

@Injectable()
export class IdosoService implements Crud {
    constructor(
        private readonly prisma: PrismaConfig,
        private readonly login: LoginService
    ) { }

    async Create(data: IdosoDto): Promise<HttpResponse> {
        try {
            const { nome, telefone, dataNasc, email, senha, doencas } = data; // Desestruturação dos elementos\
            const existsUser = await this.login.getDataFromEmail(email);

            if (existsUser) {
                return badRequest();
            }

            const idosoClass = new Idoso(nome, telefone, new Date(dataNasc), email, senha, doencas);

            data.senha = await idosoClass.encriptyPassword();

            const idoso = await this.prisma.idoso.create({
                data: {
                    Nome: nome,
                    Telefone: telefone,
                    Codigo: generateRandomCode(),
                    DataNasc: dataNasc,
                    Doencas: doencas,
                }
            });

            await this.prisma.login.create({
                data: {
                    emailUsuario: email,
                    senhaUsuario: senha,
                    idosoId: idoso.id
                }
            });

            return created(idoso);
        } catch (error) {
            console.log(error);

            return serviceError(error)
        }
    }

    async Read(email: string): Promise<HttpResponse> {
        try {
            const loginIdoso = await this.login.getDataFromEmail(email);

            if (!loginIdoso) {
                return badRequest();
            }

            const idoso = await this.prisma.idoso.findUnique({
                where: {
                    id: loginIdoso.idosoId
                }
            });

            return idoso ? success(idoso) : badRequest(); // If ternário 

        } catch (error) {
            console.log(error);

            return serviceError(error)
        }
    }

    async Update(data: IdosoDtoWithoutPass, email: string): Promise<HttpResponse> {
        try {
            const loginIdoso = await this.login.getDataFromEmail(email);
            const { statusCode, body } = await this.Read(email);

            if (statusCode == 200) {
                const { nome, telefone, dataNasc, email, doencas } = data;

                if (email != loginIdoso.emailUsuario) {
                    await this.login.updateEmail(email, loginIdoso.emailUsuario);
                }

                const newIdoso = await this.prisma.idoso.update({
                    data: {
                        Nome: nome,
                        Telefone: telefone,
                        Codigo: body.Codigo,
                        DataNasc: dataNasc,
                        Doencas: doencas,
                    },
                    where: {
                        id: loginIdoso.idosoId
                    }
                });

                return success(newIdoso);
            }
            return badRequest();

        } catch (error) {
            return serviceError(error)
        }
    }

    async Delete(email: string): Promise<HttpResponse> {
        try {
            const loginIdoso = await this.login.getDataFromEmail(email);
            const idoso = await this.Read(email);

            if (idoso.statusCode == 200) {
                const loginDelete = await this.login.deleteLoginInfo(email);

                if (!loginDelete) {
                    return serviceError(loginDelete)
                }

                await this.prisma.idoso.delete({
                    where: {
                        id: loginIdoso.idosoId
                    }
                });

                return noContent();
            }

            return badRequest()


        } catch (error) {
            return serviceError(error)
        }
    }
}