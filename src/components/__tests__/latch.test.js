import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {latch} from '../latch.js'

test('componentsBaseLatch', async (t) => {
    const testCases = [
        {
            d: '0101010',
           st: '0011100',
           expected: '0--10'
       },
    //    {
    //          d: '01--010',
    //         st: '011000',
    //         expected: '0101'
    //     },
        // {
        //      d: '01--0-1-01',
        //     st: '0--1---0--',
        //     expected: '0--1-0--'
        // },
        // {d: '0000000', st: '0-1--0-', expected: '0--10--'},
    ]
    for (const {d, st, expected} of testCases) {
        await t.test(`should show reslut ${expected} for ${d} and ${st}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(latch(createSignal(d), createSignal(st))).toBe(expected)
            })
        });
    }
});