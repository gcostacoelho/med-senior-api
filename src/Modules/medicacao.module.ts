import { MedicacaoService } from './../Services/medicacao.service';
import { MedicacaoController } from './../Controllers/medicacao.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';

@Module({
    imports: [],
    controllers: [MedicacaoController],
    providers: [MedicacaoService, PrismaConfig],
})
export class MedicacaoModule { }
