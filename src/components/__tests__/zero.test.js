import { describe, it } from 'node:test';
import assert from 'assert/strict'
import { TestScheduler } from 'rxjs/testing';
import { zero } from '../zero.js'

const createTestSchedule = () => new TestScheduler((actual, expected) => {
    assert.deepEqual(actual, expected)
});


describe('components:base:zero', () => {
    it('should show reslut 0', () => {
        const testScheduler = createTestSchedule();
        testScheduler.run(({expectObservable}) => {
            expectObservable(zero()).toBe('a', {a:0});
        });
    });
});