import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {and} from '../and.js'

test('components:base:and', async (t) => {
    const testCases = [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1],

        ['00', '00', '0-'],
        ['00', '01', '0-'],
        ['00', '10', '0-'],
        ['00', '11', '0-'],

        ['01', '00', '0-'],
        ['01', '01', '01'],
        ['01', '10', '0-'],
        ['01', '11', '01'],

        ['10', '00', '0-'],
        ['10', '01', '0-'],
        ['10', '10', '10'],
        ['10', '11', '10'],

        ['11', '00', '0-'],
        ['11', '01', '01'],
        ['11', '10', '10'],
        ['11', '11', '1-'],
    ]
    for (const [a, b, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a} and ${b}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(and(createSignal(a), createSignal(b))).toBe(expected)
            })
        });
    }
});