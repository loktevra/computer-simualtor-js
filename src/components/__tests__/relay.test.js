import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {relay} from '../relay.js'

test('components:base:relay', async (t) => {
    const testCases = [
        [0, 0, 0, 0],
        [0, 1, 0, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        ['0-', '01', '0-', '01'],
        ['01', '10', '0', '10'],
        ['0011', '0101', '0--1', '010--'],
    ]
    for (const [a, b, expectedA, expectedB] of testCases) {
        await t.test(`should show reslut a:${expectedA} b:${expectedB} for ${a} and ${b}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                const result = relay(createSignal(a), createSignal(b))
                checkSignal(result.a).toBe(expectedA)
                checkSignal(result.b).toBe(expectedB)
            })
        });
    }
});