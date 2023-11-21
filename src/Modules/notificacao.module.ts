import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaConfig } from '../Configs/prismaConfig';
import { WebPushConfig } from '../Configs/webPush.config';
import { NotificacaoService } from './../Services/notificacao.service';
import { NotificacaoController } from './../Controllers/notificacao.controller';

@Module({
    imports: [
        ScheduleModule.forRoot()
    ],
    controllers: [NotificacaoController],
    providers: [NotificacaoService, PrismaConfig, WebPushConfig],
    exports: [NotificacaoService]
})
export class NotificacaoModule { }
