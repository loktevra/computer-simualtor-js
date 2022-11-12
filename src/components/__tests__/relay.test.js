import { describe, it } from 'node:test';
import assert from 'assert/strict'
import { TestScheduler } from 'rxjs/testing';
import { relay } from '../relay.js'

const createTestSchedule = () => new TestScheduler((actual, expected) => {
    assert.deepEqual(actual, expected)
});


describe('components:base:and', () => {
    it('should show reslut 0 for undefined and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceB = hot('a', {a:0, b:1});
            const {a, b} = relay(undefined, sourceB)
            expectObservable(a).toBe('a', {a:0, b:1});
            expectObservable(b).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 0 and undefined', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            const {a, b} = relay(sourceA, undefined)
            expectObservable(a).toBe('a', {a:0, b:1});
            expectObservable(b).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 0 for undefined and undefined', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({expectObservable}) => {
            const {a, b} = relay(undefined, undefined)
            expectObservable(a).toBe('a', {a:0, b:1});
            expectObservable(b).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 0 and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            const sourceB = hot('a', {a:0, b:1});
            const {a, b} = relay(sourceA, sourceB)
            expectObservable(a).toBe('a', {a:0, b:1});
            expectObservable(b).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 0 and 1', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            const sourceB = hot('b', {a:0, b:1});
            const {a, b} = relay(sourceA, sourceB)
            expectObservable(a).toBe('a', {a:0, b:1});
            expectObservable(b).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 1 and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('b', {a:0, b:1});
            const sourceB = hot('a', {a:0, b:1});
            const {a, b} = relay(sourceA, sourceB)
            expectObservable(a).toBe('a', {a:0, b:1});
            expectObservable(b).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 1 for 1 and 1', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('b', {a:0, b:1});
            const sourceB = hot('b', {a:0, b:1});
            const {a, b} = relay(sourceA, sourceB)
            expectObservable(a).toBe('b', {a:0, b:1});
            expectObservable(b).toBe('a', {a:0, b:1});
        });
    });
    it('should show correct result in row', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('bab-ab-', {a:0, b:1});
            const sourceB = hot('b--a--b', {a:0, b:1});
            const {a, b} = relay(sourceA, sourceB)
            expectObservable(a).toBe('baba--b', {a:0, b:1});
            expectObservable(b).toBe('aba', {a:0, b:1});
        });
    });
});