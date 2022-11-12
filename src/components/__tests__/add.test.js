import {describe, it} from 'node:test';
import assert from 'assert/strict'
import {TestScheduler} from 'rxjs/testing';
import {add} from '../add.js'

const createTestSchedule = () => new TestScheduler((actual, expected) => {
    console.log('createTestSchedule', actual, expected)
    assert.deepEqual(actual, expected)
});

const valuesMap = {
    0: 'a',
    1: 'b'
}
const roadMap = Object.entries(valuesMap).reduce((acc, [value, key]) => ({...acc, [key]: +value}), {});

describe('components:base:add', () => {
    [
        [[undefined, undefined, undefined], [0, 0]],
        [[undefined, undefined, 0], [0, 0]],
        [[undefined, undefined, 1], [0, 1]],
        [[undefined, 0, undefined], [0, 0]],
        [[undefined, 0, 0], [0, 0]],
        [[undefined, 0, 1], [0, 1]],
        [[undefined, 1, undefined], [0, 1]],
        [[undefined, 1, 0], [0, 1]],
        [[undefined, 1, 1], [1, 0]],
        [[0, undefined, undefined], [0, 0]],
        [[0, undefined, 0], [0, 0]],
        [[0, undefined, 1], [0, 1]],
        [[0, 0, undefined], [0, 0]],
        [[0, 0, 0], [0, 0]],
        [[0, 0, 1], [0, 1]],
        [[0, 1, undefined], [0, 1]],
        [[0, 1, 0], [0, 1]],
        [[0, 1, 1], [1, 0]],
        [[1, undefined, undefined], [0, 1]],
        [[1, undefined, 0], [0, 1]],
        [[1, undefined, 1], [1, 0]],
        [[1, 0, undefined], [0, 1]],
        [[1, 0, 0], [0, 1]],
        [[1, 0, 1], [1, 0]],
        [[1, 1, undefined], [1, 0]],
        [[1, 1, 0], [1, 0]],
        [[1, 1, 1], [1, 1]],
    ].forEach(([ipnuts, outputs]) => {
        it(`should show reslut [h:${outputs[0]},l:${outputs[1]}] for [${ipnuts}]`, () => {
            const testScheduler = createTestSchedule();
            testScheduler.run(({hot, expectObservable}) => {
                const [inputA, inputB, inputC] = ipnuts;
                const sourceA = Number.isInteger(inputA) ? hot(valuesMap[inputA], roadMap) : undefined;
                const sourceB = Number.isInteger(inputB) ? hot(valuesMap[inputB], roadMap) : undefined;
                const sourceC = Number.isInteger(inputC) ? hot(valuesMap[inputC], roadMap) : undefined;
                const {h, l} = add(sourceA, sourceB, sourceC)
                expectObservable(h).toBe(valuesMap[outputs[0]], roadMap);
                expectObservable(l).toBe(valuesMap[outputs[1]], roadMap);
            });
        });
    });
});