import * as dotenv from 'dotenv'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    dotenv.config();

    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const configSwagger = new DocumentBuilder()
        .setTitle('MedSenior - API')
        .setDescription('MedSenior')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addTag('Cuidador', 'Endpoints para a criação das funcionalidades que envolvem o cuidador')
        .addTag('Idoso', 'Endpoints para a criação das funcionalidades que envolvem o idoso')
        .addTag('Medicacao', 'Endpoints para a criação das funcionalidades que envolvem os medicamentos')
        .addTag('Consulta', 'Endpoints para a criação das funcionalidades que envolvem as consultas')
        .addTag('Sintoma', 'Endpoints para a criação das funcionalidades que envolvem os sintomas')
        .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api', app, document);

    await app.listen(5000);
}
bootstrap();
