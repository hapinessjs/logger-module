/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';
import { Hapiness, HapinessModule, OnStart, Route, OnGet, Inject, HttpServerExt, Server } from '@hapiness/core';
import { LoggerExt, LoggerModule, LoggerService } from '../../src/';

@suite('Integration - LoggerModuleTest')
class LoggerModuleTest {

    @test('- Test logger without extension')
    test1(done) {
        let captured = '';
        const unhook_intercept = require('intercept-stdout')(str => {
            captured += str;
        });

        @HapinessModule({
            version: '1.0.0',
            imports: [ LoggerModule ]
        })
        class LMTest implements OnStart {
            constructor(private logger: LoggerService) {}

            onStart(): void {
                this.logger.info('test_log', {toto: true});
                unhook_intercept();
                unit.string(captured).hasValue('test_log { toto: true }');
                done();
            }
        }

        Hapiness.bootstrap(LMTest);
    }

    @test('- Test logger with extension')
    test2(done) {
        let captured = '';
        const unhook_intercept = require('intercept-stdout')(str => {
            captured += str;
        });

        @HapinessModule({
            version: '1.0.0',
            imports: [ LoggerModule ]
        })
        class LMTest implements OnStart {
            constructor(private logger: LoggerService) {}

            onStart(): void {
                this.logger.info('test_log', {toto: true});
                unhook_intercept();
                unit.string(captured).hasValue('test_log { toto: true }');
                done();
            }
        }

        Hapiness.bootstrap(LMTest,
            [
                LoggerExt.setConfig({ logger: console })
            ]
        ).catch(_ => /* console.error(_) */{});
    }

    @test('- Test access log')
    test3(done) {
        let captured = '';
        const unhook_intercept = require('intercept-stdout')(str => {
            captured += str;
        });

        @Route({
            method: 'get',
            path: '/log'
        })
        class RouteTest implements OnGet {
            onGet(req, repl) {
                repl('ok');
            }
        }

        @HapinessModule({
            version: '1.0.0',
            declarations: [ RouteTest ],
            imports: [ LoggerModule ]
        })
        class LMTest implements OnStart {
            constructor(@Inject(HttpServerExt) private server: Server) {}

            onStart(): void {
                this.server.inject('/log', res => {
                    unhook_intercept();
                    unit
                        .string(captured)
                        .match(/\/log \u001b\[32m200/i);
                    this.server.stop().then(_ => done());
                });
            }
        }

        Hapiness.bootstrap(LMTest,
            [
                HttpServerExt.setConfig({ host: 'localhost', port: 4444 }),
                LoggerExt.setConfig({ logger: console })
            ]
        )
    }

    @test('- Test access log - error')
    test31(done) {
        let captured = '';
        const unhook_intercept = require('intercept-stdout')(str => {
            captured += str;
        });

        @Route({
            method: 'get',
            path: '/log'
        })
        class RouteTest implements OnGet {
            onGet(req, repl) {
                repl(new Error('Oops'));
            }
        }

        @HapinessModule({
            version: '1.0.0',
            declarations: [ RouteTest ],
            imports: [ LoggerModule ]
        })
        class LMTest implements OnStart {
            constructor(@Inject(HttpServerExt) private server: Server) {}

            onStart(): void {
                this.server.inject('/log', res => {
                    unhook_intercept();
                    unit
                        .string(captured)
                        .match(/\/log \u001b\[31m500/i);
                    this.server.stop().then(_ => done());
                });
            }
        }

        Hapiness.bootstrap(LMTest,
            [
                HttpServerExt.setConfig({ host: 'localhost', port: 4444 }),
                LoggerExt.setConfig({ logger: console })
            ]
        )
    }

    @test('- Test log without access log')
    test4(done) {
        let captured = '';
        const unhook_intercept = require('intercept-stdout')(str => {
            captured += str;
        });

        @Route({
            method: 'get',
            path: '/log'
        })
        class RouteTest implements OnGet {
            onGet(req, repl) {
                repl('ok');
            }
        }

        @HapinessModule({
            version: '1.0.0',
            declarations: [ RouteTest ],
            imports: [ LoggerModule.setConfig({ accessLogs: false }) ]
        })
        class LMTest implements OnStart {
            constructor(@Inject(HttpServerExt) private server: Server) {}

            onStart(): void {
                this.server.inject('/log', res => {
                    unhook_intercept();
                    unit
                        .string(captured)
                        .notMatch(/\/log \u001b\[32m200/i);
                    this.server.stop().then(_ => done());
                });
            }
        }

        Hapiness.bootstrap(LMTest,
            [
                HttpServerExt.setConfig({ host: 'localhost', port: 4444 }),
                LoggerExt.setConfig({ logger: console })
            ]
        )
    }
}
