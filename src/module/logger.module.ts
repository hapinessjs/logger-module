import { HapinessModule } from '@hapiness/core';
import { LoggerService } from './logger.service';
import { AccessLog } from './logger.lifecycle';

@HapinessModule({
    version: '1.0.0-rc.7',
    declarations: [ AccessLog ],
    providers: [ LoggerService ],
    exports: [ LoggerService ]
})
export class LoggerModule {}
