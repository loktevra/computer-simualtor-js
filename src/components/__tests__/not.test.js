import { describe, it } from 'node:test';
import assert from 'assert/strict'
import { TestScheduler } from 'rxjs/testing';
import { not } from '../not.js'

const createTestSchedule = () => new TestScheduler((actual, expected) => {
    assert.deepEqual(actual, expected)
});


describe('components:base:not', () => {
    it('should show reslut 1 for undefined', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({expectObservable}) => {
            expectObservable(not(undefined)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('a', {a:0, b:1});
            expectObservable(not(sourceA)).toBe('b', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 1', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('b', {a:0, b:1});
            expectObservable(not(sourceA)).toBe('a', {a:0, b:1});
        });
    });
    it('should show reslut 0 for 1 and 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({hot, expectObservable}) => {
            const sourceA = hot('abbabaa', {a:0, b:1});
            expectObservable(not(sourceA)).toBe('ba-bab', {a:0, b:1});
        });
    });
});