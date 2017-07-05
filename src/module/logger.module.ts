import { HapinessModule } from '@hapiness/core';
import { LoggerService } from './logger.service';

@HapinessModule({
    version: '1.0.0-rc.3',
    exports: [ LoggerService ]
})
export class LoggerModule {}
