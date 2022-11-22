import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {nand} from '../nand.js'

test('components:base:nand', async (t) => {
    const testCases = [
        [0, 0, 1],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0],

        ['00', '00', '1-'],
        ['00', '01', '1-'],
        ['00', '10', '1-'],
        ['00', '11', '1-'],

        ['01', '00', '1-'],
        ['01', '01', '10'],
        ['01', '10', '1-'],
        ['01', '11', '10'],

        ['10', '00', '1-'],
        ['10', '01', '1-'],
        ['10', '10', '01'],
        ['10', '11', '01'],

        ['11', '00', '1-'],
        ['11', '01', '10'],
        ['11', '10', '01'],
        ['11', '11', '0-'],
        
    ]
    for (const [a, b, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a} and ${b}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(nand(createSignal(a), createSignal(b))).toBe(expected)
            })
        });
    }
});