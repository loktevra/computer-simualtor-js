import {TestScheduler} from 'rxjs/testing';
import {combineLatest, map} from 'rxjs';
import assert from 'assert/strict'

export function createSignalTest(callback) {
    const createTestSchedule = () => new TestScheduler((actual, expected) => {
        console.log(actual, expected);
        assert.deepEqual(actual, expected)
    });
    const testScheduler = createTestSchedule();
    testScheduler.run(({hot, cold, expectObservable}) => {
        const createSignal = (value) => typeof value === 'string' && value.length > 1
            ? cold(value.split('').map(char => ({'0': 'a', '1': 'b', '-': '-'})[char]).join(''), {a: 0, b: 1})
            : cold('a', {a: Number(value)});
        const createBusSignals = (value) => value.toString(2).split('').reverse().map(createSignal);
        const checkSignal = (actualValue) => ({
            toBe: (expectedValue) => {
                if (typeof expectedValue === 'string' && expectedValue.length > 1) {
                    expectObservable(actualValue).toBe(expectedValue.split('').map(char => ({'0': 'a', '1': 'b', '-': '-'})[char]).join(''), {a: 0, b: 1})
                } else {
                    expectObservable(actualValue).toBe('a', {a:Number(expectedValue)})
                }
            }
        });
        const checkBusSignal = (actualValues) => ({
            toBe: (expectedValue) => {
                expectObservable(
                    combineLatest(...actualValues)
                        .pipe(map(arr => BigInt('0b' + arr.reverse().join(''))))
                ).toBe('a', {a: BigInt(expectedValue)});
            }
        })

        callback({createSignal, createBusSignals, checkSignal, checkBusSignal});
    });
}
