import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {zero} from '../zero.js'

test('components:base:one', async (t) => {
    await t.test('should show reslut 0', () => {
        createSignalTest(({createSignal, checkSignal}) => {
            checkSignal(zero()).toBe(0)
        })
    });
});