import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';

import { SchedulerRegistry } from '@nestjs/schedule';

import { PrismaConfig } from '../Configs/prismaConfig';
import { WebPushConfig } from '../Configs/webPush.config';
import { HttpResponse, serviceError, success } from '../Types/HttpResponse';

@Injectable()
export class NotificacaoService {
    constructor(
        private readonly prisma: PrismaConfig,
        private readonly webPush: WebPushConfig,
        private readonly scheduler: SchedulerRegistry
    ) { }

    getToken(): HttpResponse {
        const token = this.webPush.publicKey;

        return success(token);
    }

    async registerUserToSendNotifications(data: any, idUser: string): Promise<HttpResponse> {
        try {
            const dataToSaveInDB = {
                auth: data.keys.auth,
                fcmUrl: data.endpoint,
                token: data.keys.p256dh,
                idosoId: idUser,
            }

            await this.prisma.dadosNotificacaoUsuario.create({
                data: dataToSaveInDB,
            });

            return success(data);
        } catch (error) {
            console.log(error);
            return serviceError(error);
        }
    }

    private async getInfosToSendNotification(userId: string) {
        try {
            const userNotificationData = await this.prisma.dadosNotificacaoUsuario.findFirst({
                where: {
                    idosoId: userId
                }
            });

            return userNotificationData;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async createCronJob(userId: string, cron: string, text: string, jobName: string) {
        const notificationsData = await this.getInfosToSendNotification(userId);

        const onlyNotificationsInformations = {
            endpoint: notificationsData.fcmUrl,
            expirationTime: null,
            keys: {
                p256dh: notificationsData.token,
                auth: notificationsData.auth
            }

        }

        const job = new CronJob(cron, () => {
            console.log("Job executando");
            
            this.webPush.sendNot(onlyNotificationsInformations, text);
        });

        console.log("Job Criado");

        this.scheduler.addCronJob(jobName, job);

        job.start();
    }

    deleteCronJob(jobName: string) {
        this.scheduler.deleteCronJob(jobName);
        console.log("Job deleted");
    }
}