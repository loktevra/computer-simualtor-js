import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {createWire} from '../createWire.js'

test('components:base:createWire', async (t) => {
    const testCases = [
        [0, 0],
        [1, 1],
        ['01', '01'],
        ['10', '10'],
        ['010', '010'],
        ['101', '101'],
        ['0101', '0101'],
        ['1010', '1010'],
    ]
    for (const [a, expected] of testCases) {
        await t.test(`should show reslut ${expected} for ${a}`, () => {
            createSignalTest(({createSignal, checkSignal}) => {
                const wire = createWire();
                const outSignal = wire.getSource();
                outSignal.subscribe((v) => console.log('VALUE: ', v));
                wire.setSource(createSignal(a))
                checkSignal(outSignal).toBe(expected);
                console.log('END')
            })
        });
    }
});