import { SintomaService } from './../Services/sintoma.service';
import { SintomaController } from './../Controllers/sintoma.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';

@Module({
    imports: [],
    controllers: [SintomaController],
    providers: [SintomaService, PrismaConfig],
})
export class SintomaModule { }
