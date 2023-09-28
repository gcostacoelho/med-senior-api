import { ConsultaService } from './../Services/consulta.service';
import { ConsultaController } from './../Controllers/consulta.controller';

import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';

@Module({
    imports: [],
    controllers: [ConsultaController],
    providers: [ConsultaService, PrismaConfig],
})
export class ConsultaModule { }
