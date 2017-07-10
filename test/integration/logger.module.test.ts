/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';
import { Hapiness, HapinessModule, OnStart } from '@hapiness/core';
import { LoggerExt, LoggerModule, LoggerService } from '../../src/';

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
}
