import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {condition8} from '../condition.js'

const MIN8 = 2n ** 8n - 1n;
const MAX8 = 2n ** 7n - 1n;

test('components:base:condition', async (t) => {
    const testCases = [
        {x: 0, lt: 0, eq: 0, gt: 0, expected: 0},
        {x: MAX8, lt: 0, eq: 0, gt: 0, expected: 0},
        {x: MIN8, lt: 0, eq: 0, gt: 0, expected: 0},

        {x: 0, lt: 0, eq: 0, gt: 1, expected: 0},
        {x: MAX8, lt: 0, eq: 0, gt: 1, expected: 1},
        {x: MIN8, lt: 0, eq: 0, gt: 1, expected: 0},

        {x: 0, lt: 0, eq: 1, gt: 0, expected: 1},
        {x: MAX8, lt: 0, eq: 1, gt: 0, expected: 0},
        {x: MIN8, lt: 0, eq: 1, gt: 0, expected: 0},

        {x: 0, lt: 0, eq: 1, gt: 1, expected: 1},
        {x: MAX8, lt: 0, eq: 1, gt: 1, expected: 1},
        {x: MIN8, lt: 0, eq: 1, gt: 1, expected: 0},

        {x: 0, lt: 1, eq: 0, gt: 0, expected: 0},
        {x: MAX8, lt: 1, eq: 0, gt: 0, expected: 0},
        {x: MIN8, lt: 1, eq: 0, gt: 0, expected: 1},

        {x: 0, lt: 1, eq: 0, gt: 1, expected: 0},
        {x: MAX8, lt: 1, eq: 0, gt: 1, expected: 1},
        {x: MIN8, lt: 1, eq: 0, gt: 1, expected: 1},

        {x: 0, lt: 1, eq: 1, gt: 0, expected: 1},
        {x: MAX8, lt: 1, eq: 1, gt: 0, expected: 0},
        {x: MIN8, lt: 1, eq: 1, gt: 0, expected: 1},

        {x: 0, lt: 1, eq: 1, gt: 1, expected: 1},
        {x: MAX8, lt: 1, eq: 1, gt: 1, expected: 1},
        {x: MIN8, lt: 1, eq: 1, gt: 1, expected: 1},

    ]
    for (const {x, lt, eq, gt, expected} of testCases) {
        await t.test(`should show reslut ${'' +expected} for x:${x} lt:${lt} eq:${eq} gt:${gt}}`, () => {
            createSignalTest(({createBusSignals, createSignal, checkSignal}) => {
                const result = condition8(
                    createBusSignals(x),
                    createSignal(lt),
                    createSignal(eq),
                    createSignal(gt)
                )
                checkSignal(result).toBe(expected)
            })
        });
    }
});