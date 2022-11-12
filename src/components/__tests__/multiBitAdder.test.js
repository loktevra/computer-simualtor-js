import {describe, it} from 'node:test';
import assert from 'assert/strict'
import {TestScheduler} from 'rxjs/testing';
import {combineLatest, map} from 'rxjs';
import {multiBitAdder} from '../multiBitAdder.js'

const createTestSchedule = () => new TestScheduler((actual, expected) => {
    console.log('createTestSchedule', actual, expected)
    assert.deepEqual(actual, expected)
});

const valuesMap = {
    0: 'a',
    1: 'b'
}
const roadMap = Object.entries(valuesMap).reduce((acc, [value, key]) => ({...acc, [key]: +value}), {});

const getSource = (input, hot) => Number.isInteger(input) ? hot(valuesMap[input], roadMap) : undefined;

const inputsToArgs = (inputs, hot) => inputs.map((val) => {
    if (Array.isArray(val)) {
        return inputsToArgs(val, hot)
    }

    return getSource(val, hot)
})

const arr = [];

for (let length = 2; length <= 5; length++) {
    let i = 0
    for (let a = 0; a < (2 ** length); a++) {
        for (let b = 0; b < (2 ** length); b++) {
            for (let c = 0;c < 2; c++) {
                arr[i++] = [
                    [
                        a.toString(2).split('').reverse().map(Number),
                        b.toString(2).split('').reverse().map(Number),
                        c,
                        length
                    ],
                    (a + b + c).toString(2).padStart(length + 1, '0').split('').reverse()
                ];
            }
        }
    }
}


describe('components:base:multiBitAdder', () => {
    arr.forEach(([inputs, outputs]) => {
        const result = [...outputs].reverse().join('')
        it(`should show reslut ${
            result
        } for ${
            inputs[0] ? [...inputs[0]].reverse().join('') : inputs[0]
        } + ${
            inputs[1] ? [...inputs[1]].reverse().join('') : inputs[1]
        } + ${
            inputs[2]
        }`, () => {
            const testScheduler = createTestSchedule();
            testScheduler.run(({hot, expectObservable}) => {
                const {c, s} = multiBitAdder({
                    a: inputsToArgs(inputs[0], hot),
                    b: inputsToArgs(inputs[1], hot),
                    c: getSource(inputs[2], hot),
                }, inputs[3])
                expectObservable(combineLatest(...s, c).pipe(map(arr => arr.reverse().join('')))).toBe('a', {a: result});
            });
        });
    });
});
