import { describe, it } from 'node:test';
import assert from 'assert/strict'
import { TestScheduler } from 'rxjs/testing';
import { xor } from '../xor.js'

const createTestSchedule = () => new TestScheduler((actual, expected) => {
    assert.deepEqual(actual, expected)
});


describe('components:base:xor', () => {
    it('should show reslut 0 for undefined and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceB = hot('a', {a:0, b:1});
            expectObservable(xor(undefined, sourceB)).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 0 and undefined', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            expectObservable(xor(sourceA, undefined)).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 0 for undefined and undefined', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            expectObservable(xor(undefined, undefined)).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 0 and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            const sourceB = hot('a', {a:0, b:1});
            expectObservable(xor(sourceA, sourceB)).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 1 for 0 and 1', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            const sourceB = hot('b', {a:0, b:1});
            expectObservable(xor(sourceA, sourceB)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 1 for 1 and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('b', {a:0, b:1});
            const sourceB = hot('a', {a:0, b:1});
            expectObservable(xor(sourceA, sourceB)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 1 and 1', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('b', {a:0, b:1});
            const sourceB = hot('b', {a:0, b:1});
            expectObservable(xor(sourceA, sourceB)).toBe('a', {a:0, b:1});
        });
    });
    it('should show correct result in row', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('bab-ab-', {a:0, b:1});
            const sourceB = hot('b--a--b', {a:0, b:1});
            expectObservable(xor(sourceA, sourceB)).toBe('abababa', {a:0, b:1});
        });
    });
});