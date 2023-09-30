import { CuidadorService } from './../Services/cuidador.service';
import { CuidadorController } from './../Controllers/cuidador.controller';
import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { LoginService } from 'src/Services/login.service';

@Module({
    imports: [],
    controllers: [CuidadorController],
    providers: [CuidadorService, PrismaConfig, LoginService],
})
export class CuidadorModule { }
