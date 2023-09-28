import { CuidadorService } from './../Services/cuidador.service';
import { CuidadorController } from './../Controllers/cuidador.controller';
import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';

@Module({
    imports: [],
    controllers: [CuidadorController],
    providers: [CuidadorService, PrismaConfig],
})
export class CuidadorModule { }
