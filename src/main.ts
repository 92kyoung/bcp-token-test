import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  let PORT = serverConfig.port || 3000;

  const startServer = (port: number) => {
    return app.listen(port).then(() => {
      Logger.log(`Application is running on Port: ${port}`);
    }).catch((err) => {
      if (err.code === 'EADDRINUSE') {
        Logger.warn(`Port ${port} is in use. Trying another port...`);
        startServer(port + 1); // 포트가 사용 중이면 +1 증가시켜서 다시 시도
      } else {
        Logger.error(`Error starting the server: ${err.message}`);
      }
    });
  };

  // 서버 실행
  await startServer(PORT);
}

bootstrap();
