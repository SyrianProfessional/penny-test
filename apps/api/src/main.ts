import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { createDocument } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    // origin: 'http://localhost:3000',
    // credentials: true,
  });

  const port = process.env.PORT || 3333;
  SwaggerModule.setup('swagger', app, createDocument(app));
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on ss: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
