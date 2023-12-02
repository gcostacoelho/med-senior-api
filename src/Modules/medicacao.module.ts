import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { MedicacaoService } from './../Services/medicacao.service';
import { MedicacaoController } from './../Controllers/medicacao.controller';
import { UsoMedicacaoService } from 'src/Services/usoMedicacao.service';
import { NotificacaoService } from 'src/Services/notificacao.service';
import { WebPushConfig } from 'src/Configs/webPush.config';

@Module({
    imports: [],
    controllers: [MedicacaoController],
    providers: [MedicacaoService, PrismaConfig, UsoMedicacaoService, NotificacaoService, WebPushConfig],
})
export class MedicacaoModule { }
