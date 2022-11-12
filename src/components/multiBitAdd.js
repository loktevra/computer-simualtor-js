import {ZERO} from './zero.js';
import {add} from './add.js';

export function multiBitAdd({a, b, c = ZERO}, length = 2) {
    a = [...a.map(val => val || ZERO), ...(new Array(length)).fill(ZERO)].slice(0, length);
    b = [...b.map(val => val || ZERO), ...(new Array(length)).fill(ZERO)].slice(0, length);

    const adds = [];
    for (let i = 0; i < length; i++) {
        adds[i] = add(a[i], b[i], i === 0 ? c : adds[i - 1].h);
    }
    
    return {
        c: adds[adds.length - 1].h,
        s: adds.map(s => s.l)
    }
}

export function add8({a, b, c}) {
    return multiBitAdd({a, b, c}, 8);
}

export function add16({a, b, c}) {
    return multiBitAdd({a, b, c}, 16);
}

export function add32({a, b, c}) {
    return multiBitAdd({a, b, c}, 32);
}

export function add64({a, b, c}) {
    return multiBitAdd({a, b, c}, 64);
}