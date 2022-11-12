import {ZERO} from './zero.js';
import {adder} from './adder.js';

export function multiBitAdder({a, b, c = ZERO}, length = 2) {
    const result = [];
    for (let i = 0; i < length; i++) {
        result[i] = adder(a[i], b[i], i === 0 ? c : result[i - 1].h);
    }
    
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