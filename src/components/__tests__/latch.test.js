import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {latch} from '../latch.js'

test('componentsBaseLatch', async (t) => {
    const testCases = [
        {
            d: '1',
           st: '1',
           expected: '1'
        },
        {
            d: '10',
           st: '11',
           expected: '10'
        },
        {
            d: '11',
           st: '11',
           expected: '1-'
        },
        {
            d: '10',
           st: '10',
           expected: '1-'
        },
        {
            d: '1000',
           st: '1000',
           expected: '1---'
        },
        {
            d: '1000',
           st: '1001',
           expected: '1--0'
        },
        {
            d: '1000',
           st: '1010',
           expected: '1-0-'
        },
        {
            d: '1000',
           st: '1011',
           expected: '1-0-'
        },
        {
            d: '1001',
           st: '1000',
           expected: '1---'
        },
        {
            d: '1001',
           st: '1001',
           expected: '1---'
        },
        {
            d: '1001',
           st: '1010',
           expected: '1-0-'
        },
        {
            d: '1001',
           st: '1011',
           expected: '1-01'
        },
        {
            d: '1010',
           st: '1000',
           expected: '1---'
        },
        {
            d: '1010',
           st: '1001',
           expected: '1--0'
        },
        {
            d: '1010',
           st: '1010',
           expected: '1---'
        },
        {
            d: '1010',
           st: '1011',
           expected: '1--0'
        },
        {
            d: '1011',
           st: '1000',
           expected: '1---'
        },
        {
            d: '1011',
           st: '1001',
           expected: '1---'
        },
        {
            d: '1011',
           st: '1010',
           expected: '1---'
        },
        {
            d: '1011',
           st: '1011',
           expected: '1---'
        },
    ]
    for (const {d, st, expected} of testCases) {
        await t.test(`should show reslut ${expected} for ${d} and ${st}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(latch(createSignal(d), createSignal(st))).toBe(expected)
            })
        });
    }
});