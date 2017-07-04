/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite, only } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';
import { Hapiness, HapinessModule, Lib, OnStart } from '@hapiness/core';
import { LoggerExt } from '../../src/module/logger.extension';
import { LoggerModule } from '../../src/module/logger.module';
import { LoggerService } from '../../src/module/logger.service';

import { HttpServerExt } from '@hapiness/core/extensions/http-server';

@suite('Integration - LoggerModuleTest')
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
        class LoggerModuleTest implements OnStart {
            constructor(private logger: LoggerService) {}

            onStart(): void {
                this.logger.info('test_log', {toto: true});
                unhook_intercept();
                unit.string(captured).hasValue('test_log { toto: true }');
                done();
            }
        }

        Hapiness.bootstrap(LoggerModuleTest);
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
        class LoggerModuleTest implements OnStart {
            constructor(private logger: LoggerService) {}

            onStart(): void {
                this.logger.info('test_log', {toto: true});
                unhook_intercept();
                unit.string(captured).hasValue('test_log { toto: true }');
                done();
            }
        }

        Hapiness.bootstrap(LoggerModuleTest,
            [
                LoggerExt.setConfig({ logger: console })
            ]
        ).catch(_ => /* console.error(_) */{});
    }
}
