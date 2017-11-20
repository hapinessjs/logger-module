import { HapinessModule, CoreModuleWithProviders } from '@hapiness/core';
import { LoggerService } from './logger.service';
import { AccessLogs } from './logger.lifecycle';
import { LOGGER_CONFIG, LoggerConfig } from './logger.config';

@HapinessModule({
    version: '1.1.0',
    declarations: [ AccessLogs ],
    providers: [ LoggerService ],
    exports: [ LoggerService ]
})
export class LoggerModule {
    static setConfig(config: LoggerConfig): CoreModuleWithProviders {
            return {
                module: LoggerModule,
                providers: [{ provide: LOGGER_CONFIG, useValue: config }]
            };
        }
}
