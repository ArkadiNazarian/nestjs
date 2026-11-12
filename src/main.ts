import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { MyLoggerService } from './my-logger/my-logger.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  app.useLogger(app.get(MyLoggerService))
  app.enableCors({
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });
  app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
