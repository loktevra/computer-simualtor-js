import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {dataFlipFlop} from '../dataFlipFlop.js'

test('components:Base:dataFlipFlop', async (t) => {
    const testCases = [
        {d: '1-', st: '1-', cl: '01', expected: '-1'},
        {d: '1-0', st: '1--', cl: '01-', expected: '-1-'},
        {d: '1-010', st: '1----', cl: '01---', expected: '-1---'},
        {d: '1-010', st: '1----', cl: '010--', expected: '-1---'},
        {d: '1-0-', st: '1----', cl: '0101-', expected: '-1-0-'},
        {d: '1-0-1-0-', st: '1---0---', cl: '01010101', expected: '-1-0-'},
    ]
    for (const {d, st, cl, expected} of testCases) {
        await t.test(`should show reslut ${expected} for d:${d} st:${st} cl:${cl}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                checkSignal(dataFlipFlop(createSignal(d), createSignal(st), createSignal(cl))).toBe(expected)
            })
        });
    }
});