import { IdosoService } from './../Services/idoso.service';
import { IdosoController } from './../Controllers/idoso.controller';

import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { LoginService } from 'src/Services/login.service';

@Module({
    imports: [],
    controllers: [IdosoController],
    providers: [IdosoService, PrismaConfig, LoginService],
})
export class IdosoModule { }
