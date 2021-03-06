import { Optional, Inject, Injectable } from '@hapiness/core';
import { LoggerExt } from './logger.extension';
import * as Debug from 'debug';
const debug = Debug('hapiness:extension:logger');

@Injectable()
export class LoggerService {

    private logger;

    constructor(@Optional() @Inject(LoggerExt) loggerExt?) {
        this.logger = loggerExt ? loggerExt : console;
    }

    /**
     * Logging from external libraries used by your app or
     * very detailed application logging.
     *
     * @param  {} ...args
     */
    public trace(...args) {
        this.logger.trace.call(this.logger, ...args);
    }

    /**
     * Anything else, i.e. too verbose to be included in "info" level.
     *
     * @param  {} ...args
     */
    public debug(...args) {
        this.logger.debug.call(this.logger, ...args);
    }

    /**
     * Detail on regular operation.
     *
     * @param  {} ...args
     */
    public info(...args) {
        this.logger.info.call(this.logger, ...args);
    }

    /**
     * A note on something that should probably be looked
     * at by an operator eventually.
     *
     * @param  {} ...args
     */
    public warn(...args) {
        this.logger.warn.call(this.logger, ...args);
    }

    /**
     * Fatal for a particular request, but the service/app continues
     * servicing other requests. An operator should look at this soon(ish).
     *
     * @param  {} ...args
     */
    public error(...args) {
        this.logger.error.call(this.logger, ...args);
    }

    /**
     * The service/app is going to stop or become unusable now.
     * An operator should definitely look into this soon.
     *
     * @param  {} ...args
     */
    public fatal(...args) {
        if (!this.logger.fatal) {
            this.logger.error.call(this.logger, ...args);
            return;
        }
        this.logger.fatal.call(this.logger, ...args);
    }

}
