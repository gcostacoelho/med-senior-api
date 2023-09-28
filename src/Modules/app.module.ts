import { NotificacaoModule } from './notificacao.module';
import { SintomaModule } from './sintoma.module';
import { ConsultaModule } from './consulta.module';
import { MedicacaoModule } from './medicacao.module';
import { IdosoModule } from './idoso.module';
import { CuidadorModule } from './cuidador.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        NotificacaoModule,
        SintomaModule,
        ConsultaModule,
        MedicacaoModule,
        IdosoModule,
        CuidadorModule,

    ],
})
export class AppModule { }
