import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {and} from '../and.js'

test('components:base:and', async (t) => {
    const testCases = [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1],
    ]
    for (const [a, b, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a} and ${b}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(and(createSignal(a), createSignal(b))).toBe(expected)
            })
        });
    }
});