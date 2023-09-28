import { IdosoService } from './../Services/idoso.service';
import { IdosoController } from './../Controllers/idoso.controller';

import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';

@Module({
    imports: [],
    controllers: [IdosoController],
    providers: [IdosoService, PrismaConfig],
})
export class IdosoModule { }
