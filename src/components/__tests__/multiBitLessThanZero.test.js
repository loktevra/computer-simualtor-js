import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {multiBitLessThanZero} from '../multiBitLessThanZero.js'

test('components:base:multiBitLessThanZero', async (t) => {
    const testCases = [
        [0, 4, 0],
        [2n ** 3n - 1n, 4, 0],
        [2n ** 3n, 4, 1],
        [2n ** 4n - 1n, 4, 1],
        [0, 8, 0],
        [2n ** 7n - 1n, 8, 0],
        [2n ** 7n, 8, 1],
        [2n ** 8n - 1n, 8, 1],
        [0, 16, 0],
        [2n ** 15n - 1n, 16, 0],
        [2n ** 15n, 16, 1],
        [2n ** 16n - 1n, 16, 1],
        [0, 32, 0],
        [2n ** 31n - 1n, 32, 0],
        [2n ** 31n, 32, 1],
        [2n ** 32n - 1n, 32, 1],
        [0, 64, 0],
        [2n ** 63n - 1n, 64, 0],
        [2n ** 63n, 64, 1],
        [2n ** 64n - 1n, 64, 1],
    ]
    for (const [a, length, expected] of testCases) {
        await t.test(`should show reslut ${'' +expected.toString(2)} for ${a.toString(2)}`, () => {
            createSignalTest(({createBusSignals, checkSignal}) => {
                const result = multiBitLessThanZero(createBusSignals(a), length)
                checkSignal(result).toBe(expected)
            })
        });
    }
});