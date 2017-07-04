import { ExtensionWithConfig, Extension, OnExtensionLoad, CoreModule } from '@hapiness/core/core';
import { Observable } from 'rxjs/Observable';
import * as Debug from 'debug';
const debug = Debug('hapiness:extension:logger');

export interface LoggerConfig {
    logger: any
}

export class LoggerExt {

    static setConfig(config: LoggerConfig): ExtensionWithConfig {
        return {
            token: LoggerExt,
            config
        };
    }

    /**
     * Initilization of the extension
     * Create the logger instance
     *
     * @param  {CoreModule} module
     * @param  {LoggerConfig} config
     * @returns Observable
     */
    onExtensionLoad(module: CoreModule, config: LoggerConfig): Observable<Extension> {
        debug('logger extension load');
        return Observable.create(observer => {
            observer.next(<Extension>{
                instance: this,
                token: LoggerExt,
                value: config.logger
            });
            observer.complete();
        });
    }
}
