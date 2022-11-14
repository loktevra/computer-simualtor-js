import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {multiBitIncrement} from '../multiBitIncrement.js'

test('components:base:multiBitIncrement', async (t) => {
    const testCases = [
        [0, 4, 1],
        [2n ** 4n - 1n, 4, 0],
        [2n ** 4n - 2n, 4, 2n ** 4n - 1n],
        [0, 8, 1],
        [2n ** 8n - 1n, 8, 0],
        [2n ** 8n - 2n, 8, 2n ** 8n - 1n],
        [0, 16, 1],
        [2n ** 16n - 1n, 16, 0],
        [2n ** 16n - 2n, 16, 2n ** 16n - 1n],
        [0, 32, 1],
        [2n ** 32n - 1n, 32, 0],
        [2n ** 32n - 2n, 32, 2n ** 32n - 1n],
        [0, 64, 1],
        [2n ** 64n - 1n, 64, 0],
        [2n ** 64n - 2n, 64, 2n ** 64n - 1n],
    ]
    for (const [a, length, expected] of testCases) {
        await t.test(`should show reslut ${'' +expected.toString(2)} for ${a.toString(2)}`, () => {
            createSignalTest(({createBusSignals, checkBusSignal}) => {
                const result = multiBitIncrement(createBusSignals(a), length)
                checkBusSignal(result).toBe(expected)
            })
        });
    }
});