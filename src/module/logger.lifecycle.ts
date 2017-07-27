import {
    Lifecycle,
    OnEvent,
    Request,
    ReplyWithContinue
} from '@hapiness/core';
import { LoggerService } from './logger.service';
import * as Chalk from 'chalk';

@Lifecycle({
    event: 'onPreResponse'
})
export class AccessLog implements OnEvent {

    constructor(private logger: LoggerService) {}

    onEvent(request: Request, reply: ReplyWithContinue) {
        const res = request.raw.res;
        const data = {
            method: request.method,
            path: request.path,
            query: request.query,
            params: request.params,
            statusCode: res.statusCode
        };
        this.logger.info(
            `${this.getMethod(request.method)} ${request.path} ${this.getStatus(res.statusCode)}`,
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
