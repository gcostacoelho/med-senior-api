import { Injectable } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';

@Injectable()
export class LoginService {
    constructor(private readonly prisma: PrismaConfig) { }

    async getDataFromEmail(email: string) {
        try {
            const info = await this.prisma.login.findUnique({
                where: {
                    emailUsuario: email
                }
            });

            return info ? info : false;
        } catch (error) {
            return error
        }
    }

    async deleteLoginInfo(email: string) {
        try {
            await this.prisma.login.delete({
                where: {
                    emailUsuario: email
                }
            });

            return true;
        } catch (error) {
            return error;
        }
    }

    async updateEmail(newEmail: string, oldEmail: string) {
        try {
            await this.prisma.login.update({
                where: { emailUsuario: oldEmail },
                data: {
                    emailUsuario: newEmail
                }
            });

            return true;
        } catch (error) {
            return error;
        }
    }
}
