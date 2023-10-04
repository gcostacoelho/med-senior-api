import { Module } from '@nestjs/common';
import { PrismaConfig } from 'src/Configs/prismaConfig';
import { MedicacaoService } from './../Services/medicacao.service';
import { MedicacaoController } from './../Controllers/medicacao.controller';
import { UsoMedicacaoService } from 'src/Services/usoMedicacao.service';

@Module({
    imports: [],
    controllers: [MedicacaoController],
    providers: [MedicacaoService, PrismaConfig, UsoMedicacaoService],
})
export class MedicacaoModule { }
