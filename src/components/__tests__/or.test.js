import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {or} from '../or.js'

test('components:base:or', async (t) => {
    const testCases = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
    ]
    for (const [a, b, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a} and ${b}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(or(createSignal(a), createSignal(b))).toBe(expected)
            })
        });
    }
});