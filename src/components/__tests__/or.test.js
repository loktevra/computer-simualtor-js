import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {or} from '../or.js'

test('components:base:or', async (t) => {
    const testCases = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 1],

        ['00', '00', '0-'],
        ['00', '01', '01'],
        ['00', '10', '10'],
        ['00', '11', '1-'],

        ['01', '00', '01'],
        ['01', '01', '01'],
        ['01', '10', '1-'],
        ['01', '11', '1-'],

        ['10', '00', '10'],
        ['10', '01', '1-'],
        ['10', '10', '10'],
        ['10', '11', '1-'],

        ['11', '00', '1-'],
        ['11', '01', '1-'],
        ['11', '10', '1-'],
        ['11', '11', '1-'],
    ]
    for (const [a, b, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a} and ${b}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(or(createSignal(a), createSignal(b))).toBe(expected)
            })
        });
    }
});