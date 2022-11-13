import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {one} from '../one.js'

test('components:base:one', async (t) => {
    await t.test('should show reslut 1', () => {
        createSignalTest(({createSignal, checkSignal}) => {
            checkSignal(one()).toBe(1)
        })
    });
});