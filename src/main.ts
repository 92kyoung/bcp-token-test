import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const PORT = serverConfig.port || 3000;
  await app.listen(PORT);
  Logger.log(`Application is running on Port: ${PORT}`);
}
bootstrap();
