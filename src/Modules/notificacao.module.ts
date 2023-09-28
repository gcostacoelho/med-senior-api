import { NotificacaoService } from './../Services/notificacao.service';
import { NotificacaoController } from './../Controllers/notificacao.controller';

import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';

@Module({
    imports: [],
    controllers: [NotificacaoController],
    providers: [NotificacaoService, PrismaConfig],
})
export class NotificacaoModule { }
