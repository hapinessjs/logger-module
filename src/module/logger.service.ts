import { Extension, ExtensionWithConfig, CoreModule, Optional, Inject, Injectable } from '@hapiness/core';
import { LoggerExt } from './logger.extension';
import { Observable } from 'rxjs/Observable';
import * as Debug from 'debug';
const debug = Debug('hapiness:extension:logger');

export interface LoggerConfig {
    logger: any
}

@Injectable()
export class LoggerService {

    private logger;

    constructor(@Optional() @Inject(LoggerExt) loggerExt) {
        this.logger = loggerExt ? loggerExt : console;
    }

    /**
     * Logging from external libraries used by your app or
     * very detailed application logging.
     *
     * @param  {} ...args
     */
    public trace(...args) {
        this.logger.trace.call(null, ...args);
    }

    /**
     * Anything else, i.e. too verbose to be included in "info" level.
     *
     * @param  {} ...args
     */
    public debug(...args) {
        this.logger.debug.call(null, ...args);
    }

    /**
     * Detail on regular operation.
     *
     * @param  {} ...args
     */
    public info(...args) {
        this.logger.info.call(null, ...args);
    }

    /**
     * A note on something that should probably be looked
     * at by an operator eventually.
     *
     * @param  {} ...args
     */
    public warn(...args) {
        this.logger.warn.call(null, ...args);
    }

    /**
     * Fatal for a particular request, but the service/app continues
     * servicing other requests. An operator should look at this soon(ish).
     *
     * @param  {} ...args
     */
    public error(...args) {
        this.logger.error.call(null, ...args);
    }

    /**
     * The service/app is going to stop or become unusable now.
     * An operator should definitely look into this soon.
     *
     * @param  {} ...args
     */
    public fatal(...args) {
        if (!this.logger.fatal) {
            this.logger.error.call(null, ...args);
            return;
        }
        this.logger.fatal.call(null, ...args);
    }

}
