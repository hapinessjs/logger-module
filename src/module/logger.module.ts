import { HapinessModule, OnRegister, Optional,
    CoreModuleWithProviders, InjectionToken, Inject } from '@hapiness/core';
import { LoggerService } from './logger.service';

const LOGGER_CONFIG = new InjectionToken('logger_config');

@HapinessModule({
    version: '1.0.0',
    exports: [ LoggerService ]
})
export class LoggerModule {}
