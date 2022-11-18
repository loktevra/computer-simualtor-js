import {ONE} from './one.js';
import {multBitSubtraction} from './multBitSubtraction.js';

export function multiBitDecrement(a, length) {
    return multBitSubtraction({ a, b:[ONE] }, length);
}

export function decrement8(a) {
    return multiBitDecrement(a, 8)
}

export function decrement16(a) {
    return multiBitDecrement(a, 16)
}

export function decrement32(a) {
    return multiBitDecrement(a, 32)
}

export function decrement64(a) {
    return multiBitDecrement(a, 64)
}