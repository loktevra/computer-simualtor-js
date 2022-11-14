import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {multBitSubtraction} from '../multBitSubtraction.js'

test('components:base:multBitSubtraction', async (t) => {
    const testCases = [
        [[0n, 0n], 2, 0n],
        [[0n, 1n], 2, 2n ** 2n - 1n],
        [[0n, 2n], 2, 2n ** 2n - 2n],
        [[0n, 3n], 2, 2n ** 2n - 3n],
        [[0n, 4n], 2, 0n],
        [[1n, 0n], 2, 1n],
        [[1n, 1n], 2, 0n],
        [[1n, 2n], 2, 2n ** 2n - 1n],
        [[1n, 3n], 2, 2n ** 2n - 2n],
        [[1n, 4n], 2, 1n],
        [[2n, 0n], 2, 2n],
        [[2n, 1n], 2, 1n],
        [[2n, 2n], 2, 0n],
        [[2n, 3n], 2, 2n ** 2n - 1n],
        [[2n, 4n], 2, 2n],
        [[3n, 0n], 2, 3n],
        [[3n, 1n], 2, 2n],
        [[3n, 2n], 2, 1n],
        [[3n, 3n], 2, 0n],
        [[3n, 4n], 2, 3n],
        [[4n, 0n], 2, 0n],
        [[4n, 1n], 2, 2n ** 2n - 1n],
        [[4n, 2n], 2, 2n ** 2n - 2n],
        [[4n, 3n], 2, 2n ** 2n - 3n],
        [[0n, 0n], 4, 0n],
        [[0n, 1n], 4, 2n ** 4n - 1n],
        [[7n, 7n], 4, 0n],
        [[0n, 7n], 4, 2n ** 4n - 7n],
        [[2n ** 4n - 1n, 0n], 4, 2n ** 4n - 1n],
        [[2n ** 4n - 1n, 2n ** 4n - 1n], 4, 0n],
        [[0n, 2n ** 4n - 1n], 4, 1n],
        [[0n, 2n ** 4n], 4, 0n],
        [[15n, 1n], 4, 14n],
        [[15n, 7n], 4, 8n],
        [[2n ** 4n - 1n, 2n ** 4n - 1n], 4, 0n],
        [[2n ** 8n - 1n, 2n ** 8n - 1n], 8, 0n],
        [[2n ** 16n - 1n, 2n ** 16n - 1n], 16, 0n],
        [[2n ** 32n - 1n, 2n ** 32n - 1n], 32, 0n],
        [[2n ** 64n - 1n, 2n ** 64n - 1n], 64, 0n],
        [[2n ** 4n - 1n, 1n], 4, 2n ** 4n - 2n],
        [[2n ** 8n - 1n, 1n], 8, 2n ** 8n - 2n],
        [[2n ** 16n - 1n, 1n], 16, 2n ** 16n - 2n],
        [[2n ** 32n - 1n, 1n], 32, 2n ** 32n - 2n],
        [[2n ** 64n - 1n, 1n], 64, 2n ** 64n - 2n],
        [[0n, 0n], 64, 0],
        [[1n, 0n], 64, 1n],
        [[1n, 1n], 64, 0],
        [[255n, 255n], 64, 0],
    ]
    for (const [[a, b], length, expected] of testCases) {
        await t.test(`should show reslut ${'' + expected.toString(2)} for ${a.toString(2)} - ${b.toString(2)}}`, () => {
            createSignalTest(({createBusSignals, checkBusSignal}) => {
                const result = multBitSubtraction({
                    a: createBusSignals(a),
                    b: createBusSignals(b),
                }, length)
                checkBusSignal(result).toBe(expected)
            })
        });
    }
});