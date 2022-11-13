import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {multiBitAdder} from '../multiBitAdder.js'

test('components:base:multiBitAdder', async (t) => {
    const testCases = [
        [[0n, 0n, 0n], 2, [0n, 0n]],
        [[0n, 1n, 0n], 2, [1n, 0n]],
        [[1n, 0n, 0n], 2, [1n, 0n]],
        [[0n, 1n, 1n], 2, [2n, 0n]],
        [[1n, 0n, 1n], 2, [2n, 0n]],
        [[1n, 1n, 0n], 2, [2n, 0n]],
        [[2n, 0n, 0n], 2, [2n, 0n]],
        [[0n, 2n, 0n], 2, [2n, 0n]],
        [[1n, 1n, 1n], 2, [3n, 0n]],
        [[1n, 2n, 0n], 2, [3n, 0n]],
        [[2n, 1n, 0n], 2, [3n, 0n]],
        [[3n, 0n, 0n], 2, [3n, 0n]],
        [[3n, 1n, 0n], 2, [0n, 1n]],
        [[3n, 2n, 0n], 2, [1n, 1n]],
        [[3n, 3n, 0n], 2, [2n, 1n]],
        [[0n, 3n, 0n], 2, [3n, 0n]],
        [[1n, 3n, 0n], 2, [0n, 1n]],
        [[2n, 3n, 0n], 2, [1n, 1n]],
        [[3n, 3n, 0n], 2, [2n, 1n]],
        [[3n, 0n, 1n], 2, [0n, 1n]],
        [[0n, 3n, 1n], 2, [0n, 1n]],
        [[1n, 3n, 1n], 2, [1n, 1n]],
        [[2n, 3n, 1n], 2, [2n, 1n]],
        [[3n, 1n, 1n], 2, [1n, 1n]],
        [[3n, 2n, 1n], 2, [2n, 1n]],
        [[3n, 3n, 1n], 2, [3n, 1n]],
        [[0n, 4n, 0n], 2, [0n, 0n]],
        [[4n, 0n, 0n], 2, [0n, 0n]],
        [[4n, 5n, 0n], 2, [1n, 0n]],
        [[4n, 5n, 0n], 2, [1n, 0n]],
        [[0n, 0n, 0n], 4, [0, 0]],
        [[0n, 0n, 1n], 4, [1n, 0]],
        [[7n, 7n, 0n], 4, [14n, 0]],
        [[7n, 7n, 1n], 4, [15n, 0]],
        [[15n, 0n, 0n], 4, [15n, 0]],
        [[15n, 0n, 1n], 4, [0n, 1n]],
        [[15n, 1n, 1n], 4, [1n, 1n]],
        [[15n, 7n, 1n], 4, [7n, 1n]],
        [[15n, 7n, 0n], 4, [6n, 1n]],
        [[2n ** 4n - 1n, 2n ** 4n - 1n, 0n], 4, [2n ** 4n - 2n, 1n]],
        [[2n ** 8n - 1n, 2n ** 8n - 1n, 0n], 8, [2n ** 8n - 2n, 1n]],
        [[2n ** 16n - 1n, 2n ** 16n - 1n, 0n], 16, [2n ** 16n - 2n, 1n]],
        [[2n ** 32n - 1n, 2n ** 32n - 1n, 0n], 32, [2n ** 32n - 2n, 1n]],
        [[2n ** 64n - 1n, 2n ** 64n - 1n, 0n], 64, [2n ** 64n - 2n, 1n]],
        [[2n ** 4n - 1n, 2n ** 4n - 1n, 1n], 4, [2n ** 4n - 1n, 1n]],
        [[2n ** 8n - 1n, 2n ** 8n - 1n, 1n], 8, [2n ** 8n - 1n, 1n]],
        [[2n ** 16n - 1n, 2n ** 16n - 1n, 1n], 16, [2n ** 16n - 1n, 1n]],
        [[2n ** 32n - 1n, 2n ** 32n - 1n, 1n], 32, [2n ** 32n - 1n, 1n]],
        [[2n ** 64n - 1n, 2n ** 64n - 1n, 1n], 64, [2n ** 64n - 1n, 1n]],
        [[0n, 0n, 0n], 64, [0, 0]],
        [[1n, 0n, 0n], 64, [1n, 0]],
        [[1n, 1n, 0n], 64, [2n, 0]],
        [[255n, 255n, 0n], 64, [510n, 0]],
        [[255n, 255n, 1n], 64, [511n, 0]],
    ]
    for (const [[a, b, c], length, [expectedS, expectedC]] of testCases) {
        await t.test(`should show reslut ${'' + expectedC + expectedS.toString(2)} for ${a.toString(2)} + ${b.toString(2)} + ${c.toString(2)}`, () => {
            createSignalTest(({createSignal, createBusSignals, checkSignal, checkBusSignal}) => {
                const result = multiBitAdder({
                    a: createBusSignals(a),
                    b: createBusSignals(b),
                    c: createSignal(c),
                }, length)
                checkBusSignal(result.s).toBe(expectedS)
                checkSignal(result.c).toBe(expectedC)
            })
        });
    }
});