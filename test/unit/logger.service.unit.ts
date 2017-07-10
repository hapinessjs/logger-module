import { test, suite } from 'mocha-typescript';
import * as unit from 'unit.js';
import { LoggerService } from '../../src';

@suite('Unit - LoggerServiceTest')
class LoggerServiceTest {

    @test('- trace')
    test1() {

        const data = ['test', {val: true}];
        const logger = {
            trace: (...args) => unit.array(args).is(data)
        };
        const service = new LoggerService(logger);
        service.trace(...data);

    }

    @test('- debug')
    test2() {

        const data = ['test', {val: true}];
        const logger = {
            debug: (...args) => unit.array(args).is(data)
        };
        const service = new LoggerService(logger);
        service.debug(...data);

    }

    @test('- info')
    test3() {

        const data = ['test', {val: true}];
        const logger = {
            info: (...args) => unit.array(args).is(data)
        };
        const service = new LoggerService(logger);
        service.info(...data);

    }

    @test('- warn')
    test4() {

        const data = ['test', {val: true}];
        const logger = {
            warn: (...args) => unit.array(args).is(data)
        };
        const service = new LoggerService(logger);
        service.warn(...data);

    }

    @test('- error')
    test5() {

        const data = ['test', {val: true}];
        const logger = {
            error: (...args) => unit.array(args).is(data)
        };
        const service = new LoggerService(logger);
        service.error(...data);

    }

    @test('- fatal')
    test6() {

        const data = ['test', {val: true}];
        const logger = {
            fatal: (...args) => unit.array(args).is(data)
        };
        const service = new LoggerService(logger);
        service.fatal(...data);

    }

    @test('- no fatal')
    test7() {

        const data = ['test', {val: true}];
        const logger = {
            error: (...args) => unit.array(args).is(data)
        };
        const service = new LoggerService(logger);
        service.fatal(...data);

    }
}
