import { InjectionToken } from '@hapiness/core';

export const LOGGER_CONFIG = new InjectionToken('logger_config');

export interface LoggerConfig {
    accessLogs: boolean
}
