import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module.js';
import { LoggerMiddleware } from './common/middleware/logger.middleware.js';


// ThrottlerModule is for rate limiting
@Module({
  imports: [UsersModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 3
    }]),
    MyLoggerModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})

export class AppModule implements NestModule {

  // this is for middleware and we can have multiple consumer for differenct middlewares
  configure(consumer: MiddlewareConsumer) {
    consumer
      // we can use as many middleware as we want .apply(LoggerMiddleware,...,...)
      .apply(LoggerMiddleware)
      // you can also pass the whole controller like .forRoutes(UsersController) and can be applied to all routes of that controller
      .forRoutes({
        path: '/users',
        method: RequestMethod.GET
      });
  }
}
