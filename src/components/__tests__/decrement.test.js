import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {multiBitDecrement} from '../decrement.js'

test('components:base:decrement', async (t) => {
    const testCases = [
        [0, 4, 2n ** 4n - 1n],
        [2n ** 4n - 1n, 4, 2n ** 4n - 2n],
        [2n ** 4n - 2n, 4, 2n ** 4n - 3n],
        [0, 8, 2n ** 8n - 1n],
        [2n ** 8n - 1n, 8, 2n ** 8n - 2n],
        [2n ** 8n - 2n, 8, 2n ** 8n - 3n],
        [0, 16, 2n ** 16n - 1n],
        [2n ** 16n - 1n, 16, 2n ** 16n - 2n],
        [2n ** 16n - 2n, 16, 2n ** 16n - 3n],
        [0, 32, 2n ** 32n - 1n],
        [2n ** 32n - 1n, 32, 2n ** 32n - 2n],
        [2n ** 32n - 2n, 32, 2n ** 32n - 3n],
        [0, 64, 2n ** 64n - 1n],
        [2n ** 64n - 1n, 64, 2n ** 64n - 2n],
        [2n ** 64n - 2n, 64, 2n ** 64n - 3n],
    ]
    for (const [a, length, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a} in length: ${length}`, () => {
            createSignalTest(({createBusSignals, checkBusSignal}) => {
                const result = multiBitDecrement(createBusSignals(a), length)
                checkBusSignal(result).toBe(expected)
            })
        });
    }
});