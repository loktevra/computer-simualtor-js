import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {nand} from '../nand.js'

test('components:base:nand', async (t) => {
    const testCases = [
        [0, 0, 1],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0],
    ]
    for (const [a, b, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a} and ${b}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(nand(createSignal(a), createSignal(b))).toBe(expected)
            })
        });
    }
});