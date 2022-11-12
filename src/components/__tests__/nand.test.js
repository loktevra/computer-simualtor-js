import { describe, it } from 'node:test';
import assert from 'assert/strict'
import { TestScheduler } from 'rxjs/testing';
import { nand } from '../nand.js'

const createTestSchedule = () => new TestScheduler((actual, expected) => {
    assert.deepEqual(actual, expected)
});


describe('components:base:and', () => {
    it('should show reslut 0 for undefined and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceB = hot('a', {a:0, b:1});
            expectObservable(nand(undefined, sourceB)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 0 and undefined', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            expectObservable(nand(sourceA, undefined)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 0 for undefined and undefined', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({expectObservable}) => {
            expectObservable(nand(undefined, undefined)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 1 for 0 and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            const sourceB = hot('a', {a:0, b:1});
            expectObservable(nand(sourceA, sourceB)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 1 for 0 and 1', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            const sourceB = hot('b', {a:0, b:1});
            expectObservable(nand(sourceA, sourceB)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 1 for 1 and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('b', {a:0, b:1});
            const sourceB = hot('a', {a:0, b:1});
            expectObservable(nand(sourceA, sourceB)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 1 and 1', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('b', {a:0, b:1});
            const sourceB = hot('b', {a:0, b:1});
            expectObservable(nand(sourceA, sourceB)).toBe('a', {a:0, b:1});
        });
    });
    it('should show correct result in row', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('bab-ab-', {a:0, b:1});
            const sourceB = hot('b--a--b', {a:0, b:1});
            expectObservable(nand(sourceA, sourceB)).toBe('abab--a', {a:0, b:1});
        });
    });
});