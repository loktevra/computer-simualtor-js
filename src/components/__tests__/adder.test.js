import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {adder} from '../adder.js'

test('components:base:adder', async (t) => {
    const testCases = [
        [[0, 0, 0], [0, 0]],
        [[0, 0, 1], [0, 1]],
        [[0, 1, 0], [0, 1]],
        [[0, 1, 1], [1, 0]],
        [[1, 0, 0], [0, 1]],
        [[1, 0, 1], [1, 0]],
        [[1, 1, 0], [1, 0]],
        [[1, 1, 1], [1, 1]],
    ]
    for (const [[a, b, c], [expectedH, expectedL]] of testCases) {
        await t.test(`should show reslut ${'' + expectedH + expectedL} for ${a + b + c}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                const {h, l} = adder(createSignal(a), createSignal(b), createSignal(c))
                checkSignal(h).toBe(expectedH)
                checkSignal(l).toBe(expectedL)
            })
        });
    }
});