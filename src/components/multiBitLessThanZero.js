import {padZero} from './zero.js';

export function multiBitLessThanZero(a, length) {
    a = padZero(a, length);

    return a[length - 1];
}

export function lessThanZero8(a) {
    return multiBitLessThanZero(a, 8);
}

export function lessThanZero16(a) {
    return multiBitLessThanZero(a, 16);
}

export function lessThanZero32(a) {
    return multiBitLessThanZero(a, 32);
}

export function lessThanZero64(a) {
    return multiBitLessThanZero(a, 64);
}
