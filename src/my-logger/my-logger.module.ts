import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service.js';

@Module({
  providers: [MyLoggerService],
  // to use in another modules we use export here then in others module use import:[MyLoggerService]
  exports:[MyLoggerService]
})
export class MyLoggerModule {}
