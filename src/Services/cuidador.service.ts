import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { Crud } from 'src/Interfaces/crud.interface';
import { CuidadorDto } from 'src/Models/Cuidador/Dtos/CuidadorDto';
import { HttpResponse, badRequest, created, noContent, serviceError, success } from 'src/Types/HttpResponse';
import { LoginService } from './login.service';
import { Cuidador } from 'src/Models/Cuidador/Cuidador';
import { CuidadorDtoWithoutPass } from 'src/Models/Cuidador/Dtos/CuidadorDtoWithoutPass';

@Injectable()
export class CuidadorService implements Crud {
    constructor(
        private readonly prisma: PrismaConfig,
        private readonly login: LoginService
    ) { }

    async Create(data: CuidadorDto): Promise<HttpResponse> {
        try {
            const { nome, telefone, dataNasc, codigoIdoso, email, senha } = data; // Desestruturação dos elementos\
            const existsUser = await this.login.getDataFromEmail(email);

            if (existsUser) {
                return badRequest();
            }

            const cuidadorClass = new Cuidador(nome, telefone, new Date(dataNasc), codigoIdoso, email, senha);

            data.senha = await cuidadorClass.encriptyPassword();

            const cuidador = await this.prisma.cuidador.create({
                data: {
                    Nome: nome,
                    Telefone: telefone,
                    DataNasc: dataNasc,
                    codigoIdoso
                }
            });

            await this.prisma.login.create({
                data: {
                    emailUsuario: email,
                    senhaUsuario: senha,
                    cuidadorId: cuidador.id
                }
            });

            return created(data);
        } catch (error) {
            return serviceError(error)
        }

    }

    async Read(email: string): Promise<HttpResponse> {
        try {
            const loginCuidador = await this.login.getDataFromEmail(email);

            if (!loginCuidador) {
                return badRequest();
            }

            const cuidador = await this.prisma.cuidador.findUnique({
                where: {
                    id: loginCuidador.cuidadorId
                }
            });

            return cuidador ? success(cuidador) : badRequest(); // If ternário 

        } catch (error) {
            console.log(error);

            return serviceError(error)
        }
    }

    async Update(data: CuidadorDtoWithoutPass, email: string): Promise<HttpResponse> {
        try {
            const loginCuidador = await this.login.getDataFromEmail(email);
            const { statusCode } = await this.Read(email);

            if (statusCode == 200) {
                const { nome, telefone, dataNasc, codigoIdoso, email } = data;

                if (email != loginCuidador.emailUsuario) {
                    await this.login.updateEmail(email, loginCuidador.emailUsuario);
                }

                const cuidadorAtualizado = await this.prisma.cuidador.update({
                    data: {
                        Nome: nome,
                        Telefone: telefone,
                        DataNasc: dataNasc,
                        codigoIdoso
                    },
                    where: {
                        id: loginCuidador.cuidadorId
                    }
                });

                return success(cuidadorAtualizado);
            }
            return badRequest();

        } catch (error) {
            return serviceError(error)
        }
    }

    async Delete(email: string): Promise<HttpResponse> {
        try {
            const loginCuidador = await this.login.getDataFromEmail(email);
            const { statusCode } = await this.Read(email);

            if (statusCode == 200) {
                const loginDelete = await this.login.deleteLoginInfo(email);

                if (!loginDelete) {
                    return serviceError(loginDelete)
                }

                await this.prisma.cuidador.delete({
                    where: {
                        id: loginCuidador.cuidadorId
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
