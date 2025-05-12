import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filters/global-exception/global-exception.filter';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('The weather API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`App listening on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
