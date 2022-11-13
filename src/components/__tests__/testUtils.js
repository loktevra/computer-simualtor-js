import {TestScheduler} from 'rxjs/testing';
import {combineLatest, map} from 'rxjs';
import assert from 'assert/strict'

export function createSignalTest(callback) {
    const createTestSchedule = () => new TestScheduler((actual, expected) => {
        assert.deepEqual(actual, expected)
    });
    const testScheduler = createTestSchedule();
    testScheduler.run(({hot, expectObservable}) => {
        const createSignal = (value) => hot('a', {a: Number(value)});
        const createBusSignals = (value) => value.toString(2).split('').reverse().map(createSignal);
        const checkSignal = (actualValue) => ({
            toBe: (expectedValue) => {
                expectObservable(actualValue).toBe('a', {a:Number(expectedValue)})
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
