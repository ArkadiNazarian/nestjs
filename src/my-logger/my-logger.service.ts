import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {

    log(message: any, context?: string) {

        super.log(message, context)
    }

    error(message: any, context?: string) {

        super.error(message, context)
    }

}
