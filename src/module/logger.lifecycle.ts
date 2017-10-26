import {
    Optional,
    Inject,
    Lifecycle,
    OnEvent,
    Request,
    ReplyWithContinue
} from '@hapiness/core';
import { LoggerService } from './logger.service';
import { LOGGER_CONFIG, LoggerConfig } from './logger.config';
import * as Chalk from 'chalk';

@Lifecycle({
    event: 'onPreResponse'
})
export class AccessLogs implements OnEvent {

    constructor(
        @Optional() @Inject(LOGGER_CONFIG) private config: LoggerConfig,
        private logger: LoggerService
    ) {
        this.config = this.config || { accessLogs: true };
    }

    onEvent(request: Request, reply: ReplyWithContinue) {
        if (!this.config.accessLogs) {
            reply.continue();
            return;
        }
        const statusCode = request.response.statusCode || request.response.output.statusCode;
        const data = {
            method: request.method,
            path: request.path,
            query: request.query,
            params: request.params,
            statusCode: statusCode
        };
        this.logger.info(
            `${this.getMethod(request.method)} ${request.path} ${this.getStatus(statusCode)}`,
            data
        );
        reply.continue();
    }

    /**
     * Get formatted status
     *
     * @param  {number} status
     */
    private getStatus(status: number): string {
        /* istanbul ignore if */
        if (status >= 400) {
            return Chalk.red(status.toString());
        } else {
            return Chalk.green(status.toString());
        }
    }

    /**
     * Get formatted method
     *
     * @param  {string} method
     */
    private getMethod(method: string): string {
        const _method = method.toUpperCase();
        /* istanbul ignore next */
        switch (_method) {
            case 'GET':
                return Chalk.green.bold(_method);
            case 'POST':
                return Chalk.yellow.bold(_method);
            case 'PUT':
                return Chalk.blue.bold(_method);
            case 'DELETE':
                return Chalk.red.bold(_method);
            default:
                return Chalk.cyan.bold(_method);
        }
    }
}
