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
        .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
