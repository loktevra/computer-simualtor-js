import test from 'node:test';
import {createSignalTest} from './testUtils.js';
import {alu8} from '../alu.js'

const MAX8 = 2n ** 8n - 1n;

test('components:base:alu8', async (t) => {
    const testCases = [
        // adder
        {x: 0, y: 0, u: 1, op0: 0, op1: 0, zx: 0, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 1, op0: 0, op1: 0, zx: 0, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 1, op0: 0, op1: 0, zx: 0, sw: 0, expected: MAX8},
        {x: MAX8, y: MAX8, u: 1, op0: 0, op1: 0, zx: 0, sw: 0, expected: 2n ** 8n - 2n},

        {x: 0, y: 0, u: 1, op0: 0, op1: 0, zx: 0, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 1, op0: 0, op1: 0, zx: 0, sw: 1, expected: MAX8},
        {x: MAX8, y: 0, u: 1, op0: 0, op1: 0, zx: 0, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 1, op0: 0, op1: 0, zx: 0, sw: 1, expected: 2n ** 8n - 2n},

        {x: 0, y: 0, u: 1, op0: 0, op1: 0, zx: 1, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 1, op0: 0, op1: 0, zx: 1, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 1, op0: 0, op1: 0, zx: 1, sw: 0, expected: 0},
        {x: MAX8, y: MAX8, u: 1, op0: 0, op1: 0, zx: 1, sw: 0, expected: MAX8},

        {x: 0, y: 0, u: 1, op0: 0, op1: 0, zx: 1, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 1, op0: 0, op1: 0, zx: 1, sw: 1, expected: 0},
        {x: MAX8, y: 0, u: 1, op0: 0, op1: 0, zx: 1, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 1, op0: 0, op1: 0, zx: 1, sw: 1, expected: MAX8},

        // Increment X
        {x: 0, y: 0, u: 1, op0: 1, op1: 0, zx: 0, sw: 0, expected: 1},
        {x: 0, y: MAX8, u: 1, op0: 1, op1: 0, zx: 0, sw: 0, expected: 1},
        {x: MAX8, y: 0, u: 1, op0: 1, op1: 0, zx: 0, sw: 0, expected: 0},
        {x: MAX8, y: MAX8, u: 1, op0: 1, op1: 0, zx: 0, sw: 0, expected: 0},

        {x: 0, y: 0, u: 1, op0: 1, op1: 0, zx: 0, sw: 1, expected: 1},
        {x: 0, y: MAX8, u: 1, op0: 1, op1: 0, zx: 0, sw: 1, expected: 0},
        {x: MAX8, y: 0, u: 1, op0: 1, op1: 0, zx: 0, sw: 1, expected: 1},
        {x: MAX8, y: MAX8, u: 1, op0: 1, op1: 0, zx: 0, sw: 1, expected: 0},

        {x: 0, y: 0, u: 1, op0: 1, op1: 0, zx: 1, sw: 0, expected: 1},
        {x: 0, y: MAX8, u: 1, op0: 1, op1: 0, zx: 1, sw: 0, expected: 1},
        {x: MAX8, y: 0, u: 1, op0: 1, op1: 0, zx: 1, sw: 0, expected: 1},
        {x: MAX8, y: MAX8, u: 1, op0: 1, op1: 0, zx: 1, sw: 0, expected: 1},

        {x: 0, y: 0, u: 1, op0: 1, op1: 0, zx: 1, sw: 1, expected: 1},
        {x: 0, y: MAX8, u: 1, op0: 1, op1: 0, zx: 1, sw: 1, expected: 1},
        {x: MAX8, y: 0, u: 1, op0: 1, op1: 0, zx: 1, sw: 1, expected: 1},
        {x: MAX8, y: MAX8, u: 1, op0: 1, op1: 0, zx: 1, sw: 1, expected: 1},

        // Subtraction
        {x: 0, y: 0, u: 1, op0: 0, op1: 1, zx: 0, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 1, op0: 0, op1: 1, zx: 0, sw: 0, expected: 1},
        {x: MAX8, y: 0, u: 1, op0: 0, op1: 1, zx: 0, sw: 0, expected: MAX8},
        {x: MAX8, y: MAX8, u: 1, op0: 0, op1: 1, zx: 0, sw: 0, expected: 0},

        {x: 0, y: 0, u: 1, op0: 0, op1: 1, zx: 0, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 1, op0: 0, op1: 1, zx: 0, sw: 1, expected: MAX8},
        {x: MAX8, y: 0, u: 1, op0: 0, op1: 1, zx: 0, sw: 1, expected: 1},
        {x: MAX8, y: MAX8, u: 1, op0: 0, op1: 1, zx: 0, sw: 1, expected: 0},

        {x: 0, y: 0, u: 1, op0: 0, op1: 1, zx: 1, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 1, op0: 0, op1: 1, zx: 1, sw: 0, expected: 1},
        {x: MAX8, y: 0, u: 1, op0: 0, op1: 1, zx: 1, sw: 0, expected: 0},
        {x: MAX8, y: MAX8, u: 1, op0: 0, op1: 1, zx: 1, sw: 0, expected: 1},

        {x: 0, y: 0, u: 1, op0: 0, op1: 1, zx: 1, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 1, op0: 0, op1: 1, zx: 1, sw: 1, expected: 0},
        {x: MAX8, y: 0, u: 1, op0: 0, op1: 1, zx: 1, sw: 1, expected: 1},
        {x: MAX8, y: MAX8, u: 1, op0: 0, op1: 1, zx: 1, sw: 1, expected: 1},

        // decrement X
        {x: 0, y: 0, u: 1, op0: 1, op1: 1, zx: 0, sw: 0, expected: MAX8},
        {x: 0, y: MAX8, u: 1, op0: 1, op1: 1, zx: 0, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 1, op0: 1, op1: 1, zx: 0, sw: 0, expected: 2n ** 8n - 2n},
        {x: MAX8, y: MAX8, u: 1, op0: 1, op1: 1, zx: 0, sw: 0, expected: 2n ** 8n - 2n},

        {x: 0, y: 0, u: 1, op0: 1, op1: 1, zx: 0, sw: 1, expected: MAX8},
        {x: 0, y: MAX8, u: 1, op0: 1, op1: 1, zx: 0, sw: 1, expected: 2n ** 8n - 2n},
        {x: MAX8, y: 0, u: 1, op0: 1, op1: 1, zx: 0, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 1, op0: 1, op1: 1, zx: 0, sw: 1, expected: 2n ** 8n - 2n},

        {x: 0, y: 0, u: 1, op0: 1, op1: 1, zx: 1, sw: 0, expected: MAX8},
        {x: 0, y: MAX8, u: 1, op0: 1, op1: 1, zx: 1, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 1, op0: 1, op1: 1, zx: 1, sw: 0, expected: MAX8},
        {x: MAX8, y: MAX8, u: 1, op0: 1, op1: 1, zx: 1, sw: 0, expected: MAX8},

        {x: 0, y: 0, u: 1, op0: 1, op1: 1, zx: 1, sw: 1, expected: MAX8},
        {x: 0, y: MAX8, u: 1, op0: 1, op1: 1, zx: 1, sw: 1, expected: MAX8},
        {x: MAX8, y: 0, u: 1, op0: 1, op1: 1, zx: 1, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 1, op0: 1, op1: 1, zx: 1, sw: 1, expected: MAX8},


        // AND
        {x: 0, y: 0, u: 0, op0: 0, op1: 0, zx: 0, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 0, op1: 0, zx: 0, sw: 0, expected: 0},
        {x: MAX8, y: 0, u: 0, op0: 0, op1: 0, zx: 0, sw: 0, expected: 0},
        {x: MAX8, y: MAX8, u: 0, op0: 0, op1: 0, zx: 0, sw: 0, expected: MAX8},

        {x: 0, y: 0, u: 0, op0: 0, op1: 0, zx: 0, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 0, op1: 0, zx: 0, sw: 1, expected: 0},
        {x: MAX8, y: 0, u: 0, op0: 0, op1: 0, zx: 0, sw: 1, expected: 0},
        {x: MAX8, y: MAX8, u: 0, op0: 0, op1: 0, zx: 0, sw: 1, expected: MAX8},

        {x: 0, y: 0, u: 0, op0: 0, op1: 0, zx: 1, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 0, op1: 0, zx: 1, sw: 0, expected: 0},
        {x: MAX8, y: 0, u: 0, op0: 0, op1: 0, zx: 1, sw: 0, expected: 0},
        {x: MAX8, y: MAX8, u: 0, op0: 0, op1: 0, zx: 1, sw: 0, expected: 0},

        {x: 0, y: 0, u: 0, op0: 0, op1: 0, zx: 1, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 0, op1: 0, zx: 1, sw: 1, expected: 0},
        {x: MAX8, y: 0, u: 0, op0: 0, op1: 0, zx: 1, sw: 1, expected: 0},
        {x: MAX8, y: MAX8, u: 0, op0: 0, op1: 0, zx: 1, sw: 1, expected: 0},

        // OR
        {x: 0, y: 0, u: 0, op0: 1, op1: 0, zx: 0, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 1, op1: 0, zx: 0, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 0, op0: 1, op1: 0, zx: 0, sw: 0, expected: MAX8},
        {x: MAX8, y: MAX8, u: 0, op0: 1, op1: 0, zx: 0, sw: 0, expected: MAX8},

        {x: 0, y: 0, u: 0, op0: 1, op1: 0, zx: 0, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 1, op1: 0, zx: 0, sw: 1, expected: MAX8},
        {x: MAX8, y: 0, u: 0, op0: 1, op1: 0, zx: 0, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 0, op0: 1, op1: 0, zx: 0, sw: 1, expected: MAX8},

        {x: 0, y: 0, u: 0, op0: 1, op1: 0, zx: 1, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 1, op1: 0, zx: 1, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 0, op0: 1, op1: 0, zx: 1, sw: 0, expected: 0},
        {x: MAX8, y: MAX8, u: 0, op0: 1, op1: 0, zx: 1, sw: 0, expected: MAX8},

        {x: 0, y: 0, u: 0, op0: 1, op1: 0, zx: 1, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 1, op1: 0, zx: 1, sw: 1, expected: 0},
        {x: MAX8, y: 0, u: 0, op0: 1, op1: 0, zx: 1, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 0, op0: 1, op1: 0, zx: 1, sw: 1, expected: MAX8},

        // XOR
        {x: 0, y: 0, u: 0, op0: 0, op1: 1, zx: 0, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 0, op1: 1, zx: 0, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 0, op0: 0, op1: 1, zx: 0, sw: 0, expected: MAX8},
        {x: MAX8, y: MAX8, u: 0, op0: 0, op1: 1, zx: 0, sw: 0, expected: 0},

        {x: 0, y: 0, u: 0, op0: 0, op1: 1, zx: 0, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 0, op1: 1, zx: 0, sw: 1, expected: MAX8},
        {x: MAX8, y: 0, u: 0, op0: 0, op1: 1, zx: 0, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 0, op0: 0, op1: 1, zx: 0, sw: 1, expected: 0},

        {x: 0, y: 0, u: 0, op0: 0, op1: 1, zx: 1, sw: 0, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 0, op1: 1, zx: 1, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 0, op0: 0, op1: 1, zx: 1, sw: 0, expected: 0},
        {x: MAX8, y: MAX8, u: 0, op0: 0, op1: 1, zx: 1, sw: 0, expected: MAX8},

        {x: 0, y: 0, u: 0, op0: 0, op1: 1, zx: 1, sw: 1, expected: 0},
        {x: 0, y: MAX8, u: 0, op0: 0, op1: 1, zx: 1, sw: 1, expected: 0},
        {x: MAX8, y: 0, u: 0, op0: 0, op1: 1, zx: 1, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 0, op0: 0, op1: 1, zx: 1, sw: 1, expected: MAX8},

        // NOT X
        {x: 0, y: 0, u: 0, op0: 1, op1: 1, zx: 0, sw: 0, expected: MAX8},
        {x: 0, y: MAX8, u: 0, op0: 1, op1: 1, zx: 0, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 0, op0: 1, op1: 1, zx: 0, sw: 0, expected: 0},
        {x: MAX8, y: MAX8, u: 0, op0: 1, op1: 1, zx: 0, sw: 0, expected: 0},

        {x: 0, y: 0, u: 0, op0: 1, op1: 1, zx: 0, sw: 1, expected: MAX8},
        {x: 0, y: MAX8, u: 0, op0: 1, op1: 1, zx: 0, sw: 1, expected: 0},
        {x: MAX8, y: 0, u: 0, op0: 1, op1: 1, zx: 0, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 0, op0: 1, op1: 1, zx: 0, sw: 1, expected: 0},

        {x: 0, y: 0, u: 0, op0: 1, op1: 1, zx: 1, sw: 0, expected: MAX8},
        {x: 0, y: MAX8, u: 0, op0: 1, op1: 1, zx: 1, sw: 0, expected: MAX8},
        {x: MAX8, y: 0, u: 0, op0: 1, op1: 1, zx: 1, sw: 0, expected: MAX8},
        {x: MAX8, y: MAX8, u: 0, op0: 1, op1: 1, zx: 1, sw: 0, expected: MAX8},

        {x: 0, y: 0, u: 0, op0: 1, op1: 1, zx: 1, sw: 1, expected: MAX8},
        {x: 0, y: MAX8, u: 0, op0: 1, op1: 1, zx: 1, sw: 1, expected: MAX8},
        {x: MAX8, y: 0, u: 0, op0: 1, op1: 1, zx: 1, sw: 1, expected: MAX8},
        {x: MAX8, y: MAX8, u: 0, op0: 1, op1: 1, zx: 1, sw: 1, expected: MAX8},

    ]
    for (const {x, y, u, op0, op1, zx, sw, expected} of testCases) {
        await t.test(`should show reslut ${'' +expected} for x:${x} y:${y} u:${u} op0:${op0} op1:${op1} zx:${zx}, sw:${sw}`, () => {
            createSignalTest(({createBusSignals, createSignal, checkBusSignal}) => {
                const result = alu8(
                    createBusSignals(x),
                    createBusSignals(y),
                    createSignal(u),
                    createSignal(op0),
                    createSignal(op1),
                    createSignal(zx),
                    createSignal(sw),
                )
                checkBusSignal(result).toBe(expected)
            })
        });
    }
});