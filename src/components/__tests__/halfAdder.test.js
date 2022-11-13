import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {halfAdder} from '../halfAdder.js'

test('components:base:halfAdder', async (t) => {
    const testCases = [
        [[0, 0], [0, 0]],
        [[0, 1], [0, 1]],
        [[1, 0], [0, 1]],
        [[1, 1], [1, 0]],
    ]
    for (const [[a, b], [expectedH, expectedL]] of testCases) {
        await t.test(`should show reslut ${'' + expectedH + expectedL} for ${a + b}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                const {h, l} = halfAdder(createSignal(a), createSignal(b))
                checkSignal(h).toBe(expectedH)
                checkSignal(l).toBe(expectedL)
            })
        });
    }
});