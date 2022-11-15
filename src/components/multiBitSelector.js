import {or} from "./or.js";
import {not} from './not.js';
import {and} from './and.js';
import {padZero} from './zero.js';

export function selector(d0, d1, s) {
    return  or(and(not(s), d0), and(s, d1))
}

export function multiBitSelector(d0, d1, s, length) {
    d0 = padZero(d0, length);
    d1 = padZero(d1, length);

    let result = [];

    for (let index = 0; index < length; index++) {
        result[index] = selector(d0[index], d1[index], s);
    }

    return result;
}

export function selector8(d0, d1, s) {
    return multiBitSelector(d0, d1, s, length);
}

export function selector16(d0, d1, s) {
    return multiBitSelector(d0, d1, s, 16);
}

export function selector32(d0, d1, s) {
    return multiBitSelector(d0, d1, s, 32);
}

export function selector64(d0, d1, s) {
    return multiBitSelector(d0, d1, s, 64);
}

