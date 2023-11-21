import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';

import { SchedulerRegistry } from '@nestjs/schedule';

import { PrismaConfig } from '../Configs/prismaConfig';
import { WebPushConfig } from '../Configs/webPush.config';
import { HttpResponse, success } from '../Types/HttpResponse';

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

    async registerUserToSendNotifications(data): Promise<HttpResponse> {
        return await success("");
    }

    private async getInfosToSendNotification(userId: string) {
        try {
            const userNotificationData = await this.prisma.dadosNotificacaoUsuario.findFirst({
                where: {
                    cuidadorId: userId,
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

        console.log(notificationsData);

        const job = new CronJob(cron, () => {
            this.webPush.sendNot(notificationsData.token, text);
        });

        console.log("Job Criado");

        this.scheduler.addCronJob(jobName, job);

        job.start();
    }

    deleteCronJob(jobName: string) { }
}