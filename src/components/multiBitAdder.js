import {ZERO} from './zero.js';
import {adder} from './adder.js';

export function multiBitAdder({a, b, c = ZERO}, length = 2) {
    const result = [];
    for (let i = 0; i < length; i++) {
        result[i] = adder(a[i] || ZERO, b[i] || ZERO, i === 0 ? c : result[i - 1].h);
    }
    // result[0] = adder(a[0], b[0], c);
    // result[1] = adder(a[1], b[1], result[0].h);


    return {
        c: result[result.length - 1].h,
        s: result.map(s => s.l)
    }
}

export function adder8({a, b, c}) {
    return multiBitAdder({a, b, c}, 8);
}

export function adder16({a, b, c}) {
    return multiBitAdder({a, b, c}, 16);
}

export function adder32({a, b, c}) {
    return multiBitAdder({a, b, c}, 32);
}

export function adder64({a, b, c}) {
    return multiBitAdder({a, b, c}, 64);
}