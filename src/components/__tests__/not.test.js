import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {not} from '../not.js'

test('components:base:not', async (t) => {
    const testCases = [
        [0, 1],
        [1, 0],
    ]
    for (const [a, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a} `, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(not(createSignal(a))).toBe(expected)
            })
        });
    }
});