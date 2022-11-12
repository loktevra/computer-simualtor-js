import { describe, it } from 'node:test';
import assert from 'assert/strict'
import { TestScheduler } from 'rxjs/testing';
import { one } from '../one.js'

const createTestSchedule = () => new TestScheduler((actual, expected) => {
    assert.deepEqual(actual, expected)
});


describe('components:base:one', () => {
    it('should show reslut 1', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({expectObservable}) => {
            expectObservable(one()).toBe('b', {b:1});
        });
    });
});