import { HapinessModule, OnRegister, HttpServer, Optional,
    CoreModuleWithProviders, InjectionToken, Inject } from '@hapiness/core';
import * as Good from 'good';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

const LOGGER_CONFIG = new InjectionToken('logger_config');

@HapinessModule({
    version: '1.0.0-beta.6'
})
export class LoggerModule implements OnRegister {

    static setConfig(config: any): CoreModuleWithProviders {
        return {
            module: LoggerModule,
            providers: [{ provide: LOGGER_CONFIG, useValue: config }]
        };
    }

    constructor(private server: HttpServer, @Optional() @Inject(LOGGER_CONFIG) private config) {}

    onRegister() {
        if (!this.config) {
            this.config = {
                reporters: {
                    console: [
                        {
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{
                                log: '*',
                                response: '*'
                            }]
                        }, {
                            module: 'good-console',
                            args: [{
                                format: 'YYYY-MM-DD HH:mm:ss.SSS'
                            }]
                        }, 'stdout'
                    ]
                }
            }
        }

        return Observable.fromPromise(this.server.instance.register({
            register: Good,
            options: this.config
        }));
    }

}
