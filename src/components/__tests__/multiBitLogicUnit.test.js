import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {multiBitLogicUnit} from '../logicUnit.js'

test('components:base:multiBitLogicUnit', async (t) => {
    const testCases = [
        [0, 0, 0, 0, 8, 0],
        [0, 2n ** 8n - 1n, 0, 0, 8, 0],
        [2n ** 8n - 1n, 0, 0, 0, 8, 0],
        [2n ** 8n - 1n, 2n ** 8n - 1n, 0, 0, 8, 2n ** 8n - 1n],

        [0, 0, 1, 0, 8, 0],
        [0, 2n ** 8n - 1n, 1, 0, 8, 2n ** 8n - 1n],
        [2n ** 8n - 1n, 0, 1, 0, 8, 2n ** 8n - 1n],
        [2n ** 8n - 1n, 2n ** 8n - 1n, 1, 0, 8, 2n ** 8n - 1n],


        [0, 0, 0, 1, 8, 0],
        [0, 2n ** 8n - 1n, 0, 1, 8, 2n ** 8n - 1n],
        [2n ** 8n - 1n, 0, 0, 1, 8, 2n ** 8n - 1n],
        [2n ** 8n - 1n, 2n ** 8n - 1n, 0, 1, 8, 0],

        [0, 0, 1, 1, 8, 2n ** 8n - 1n],
        [0, 2n ** 8n - 1n, 1, 1, 8, 2n ** 8n - 1n],
        [2n ** 8n - 1n, 0, 1, 1, 8, 0],
        [2n ** 8n - 1n, 2n ** 8n - 1n, 1, 1, 8, 0],

    ]
    for (const [x, y, op0, op1, length, expected] of testCases) {
        await t.test(`should show reslut ${'' +expected} for x:${x} y:${y} op0:${op0} op1:${op1} length:${length}`, () => {
            createSignalTest(({createBusSignals, createSignal, checkBusSignal}) => {
                const result = multiBitLogicUnit(createBusSignals(x), createBusSignals(y), createSignal(op0), createSignal(op1), length)
                checkBusSignal(result).toBe(expected)
            })
        });
    }
});