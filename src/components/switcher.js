import {and} from './and.js';
import {not} from './not.js';
import {padZero} from './zero.js';

export function switcher(d, selector) {
    return {
        c0: and(not(selector), d),
        c1: and(selector, d)
    }
}

export function multiBitSwitcher(d, selector, length) {
    d = padZero(d, length);

    const result = d.map(digit => switcher(digit, selector));

    return {
        c0: result.map(({c0 }) => c0),
        c1: result.map(({c1 }) => c1),
    }
}

export function switcher8(d, selector) {
    return multiBitSwitcher(d, selector, 8);
}

export function switcher16(d, selector) {
    return multiBitSwitcher(d, selector, 16);
}

export function switcher32(d, selector) {
    return multiBitSwitcher(d, selector, 32);
}

export function switcher64(d, selector) {
    return multiBitSwitcher(d, selector, 64);
}