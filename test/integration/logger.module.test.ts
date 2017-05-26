/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Hapiness, HapinessModule, HttpServer, Lib, OnStart } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

import { LoggerModule } from '../../src';

@suite('- Integration LoggerModuleTest file')
class LoggerModuleTest {
    /**
     * Function executed before the suite
     */
    static before() {}

    /**
     * Function executed after the suite
     */
    static after() {}

    /**
     * Class constructor
     * New lifecycle
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {}

    /**
     * Function executed after each test
     */
    after() {}

    @test('- Test logger without config')
    testWithoutConfig(done) {
        let captured = '';
        const unhook_intercept = require('intercept-stdout')(str => {
            captured += str;
        });

        @HapinessModule({
            version: '1.0.0',
            options: {
                host: '0.0.0.0',
                port: 4443
            },
            imports: [
                LoggerModule
            ]
        })
        class LoggerModuleTest implements OnStart {
            constructor(private server: HttpServer) {}

            onStart(): void {

                this.server.instance.log(null, 'my log');
                Hapiness.kill().subscribe(__ => {
                    unhook_intercept();
                    unit.string(captured).hasValue('data: my log');
                    done();
                });

            }
        }

        Hapiness.bootstrap(LoggerModuleTest);
    }

    @test('- Test logger with config')
    testWithConfig(done) {
        let captured = '';
        const unhook_intercept = require('intercept-stdout')(str => {
            captured += str;
        });

        @HapinessModule({
            version: '1.0.0',
            options: {
                host: '0.0.0.0',
                port: 4443
            },
            imports: [
                LoggerModule.setConfig({
                    reporters: {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{
                                    log: 'warn',
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
                })
            ]
        })
        class LoggerModuleTest implements OnStart {
            constructor(private server: HttpServer) {}

            onStart(): void {

                this.server.instance.log(['warn'], 'my log');
                Hapiness.kill().subscribe(__ => {
                    unhook_intercept();
                    unit.string(captured).hasValue('data: my log');
                    done();
                });

            }
        }

        Hapiness.bootstrap(LoggerModuleTest);
    }
}
