import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {createWire} from '../createWire.js'

test('components:base:createWire', async (t) => {
    const testCases = [
        // [0, 0],
        [1, 1],
        // ['01', '01'],
        ['10', '10'],
        // ['010', '010'],
        ['101', '101'],
        // ['0101', '0101'],
        ['1010', '1010'],
        ['10110', '101-0'],
    ]
    for (const [a, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                const signalA = createSignal(a);
                const wire = createWire();
                const outSignal = wire.getSource();
                wire.setSource(signalA)
                checkSignal(outSignal).toBe(expected);
            })
        });
    }
});