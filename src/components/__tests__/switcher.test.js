import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {multiBitSwitcher} from '../switcher.js'

test('components:base:multiBitSwitcher', async (t) => {
    const testCases = [
        [3, 0, 2, 3, 0],
        [3, 1, 2, 0, 3],

        [2n ** 4n - 1n, 0, 4, 2n ** 4n - 1n, 0],
        [2n ** 4n - 1n, 1, 4, 0, 2n ** 4n - 1n],

        [2n ** 8n - 1n, 0, 8, 2n ** 8n - 1n, 0],
        [2n ** 8n - 1n, 1, 8, 0, 2n ** 8n - 1n],

        [2n ** 16n - 1n, 0, 16, 2n ** 16n - 1n, 0],
        [2n ** 16n - 1n, 1, 16, 0, 2n ** 16n - 1n],

        [2n ** 32n - 1n, 0, 32, 2n ** 32n - 1n, 0],
        [2n ** 32n - 1n, 1, 32, 0, 2n ** 32n - 1n],

        [2n ** 64n - 1n, 0, 64, 2n ** 64n - 1n, 0],
        [2n ** 64n - 1n, 1, 64, 0, 2n ** 64n - 1n],

    ]
    for (const [d, selector, length, c0, c1] of testCases) {
        await t.test(`should show reslut c0:${c0} c1:${c1} for digit:${d} selector:${selector} length:${length} `, () => {
            createSignalTest(({createBusSignals, createSignal, checkBusSignal}) => {
                const result = multiBitSwitcher(createBusSignals(d), createSignal(selector), length)
                checkBusSignal(result.c0).toBe(c0)
                checkBusSignal(result.c1).toBe(c1)
            })
        });
    }
});