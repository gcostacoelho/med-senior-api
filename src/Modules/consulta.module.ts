import { ConsultaService } from './../Services/consulta.service';
import { ConsultaController } from './../Controllers/consulta.controller';

import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { NotificacaoService } from 'src/Services/notificacao.service';

@Module({
    imports: [],
    controllers: [ConsultaController],
    providers: [ConsultaService, PrismaConfig, NotificacaoService],
})
export class ConsultaModule { }
