import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { SintomaModule } from './sintoma.module';
import { ConsultaModule } from './consulta.module';
import { MedicacaoModule } from './medicacao.module';
import { IdosoModule } from './idoso.module';
import { CuidadorModule } from './cuidador.module';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { SintomaController } from '../Controllers/sintoma.controller';
import { ConsultaController } from '../Controllers/consulta.controller';
import { MedicacaoController } from '../Controllers/medicacao.controller';
import { CuidadorController } from '../Controllers/cuidador.controller';
import { IdosoController } from '../Controllers/idoso.controller';

@Module({
    imports: [
        SintomaModule,
        ConsultaModule,
        MedicacaoModule,
        IdosoModule,
        CuidadorModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).exclude(
            { path: "idoso", method: RequestMethod.POST },
            { path: "cuidador", method: RequestMethod.POST }
        ).forRoutes(SintomaController, ConsultaController, MedicacaoController, CuidadorController, IdosoController);
    }
}
