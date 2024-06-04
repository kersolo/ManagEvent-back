import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './utils/exception/prisma-client-exception.filter';
import { Interceptor } from 'interceptor/interceptor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());//favorise l'utilisation des dto, il valide la compatibilté d un objet avec une classe
  app.useGlobalInterceptors(new Interceptor());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));//validation en bdd

  const config = new DocumentBuilder()
    .setTitle('ManagEvent')
    .setDescription('The ManagEvent API description')
    .setVersion('0.1')
    .addTag('Read me')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apiDoc', app, document);
  app.enableCors(); // rajouté pour accepter les requêtes d un autre domaine
  await app.listen(3000);
}
bootstrap();
