import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { MyLoggerService } from './my-logger/my-logger.service.js';
import { ValidationPipe } from '@nestjs/common';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor.js';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  app.useGlobalPipes(
    new ValidationPipe({
      // this removes extra properties that doesnt exist in DTO
      whitelist: true,
      // this gives error if extra properties exist in body
      forbidNonWhitelisted: true,
      // transform comming object that we exactly expecting in DTO
      transform: true,
    })
  )
  // if we want to use db or others in interceptor , we can't use app.useGlobalInterceptors(new WrapResponseInterceptor())
  // instead we should use customer provider
  app.useGlobalInterceptors(new WrapResponseInterceptor(),new TimeoutInterceptor())
  app.useLogger(app.get(MyLoggerService))
  app.enableCors({
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });
  app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
