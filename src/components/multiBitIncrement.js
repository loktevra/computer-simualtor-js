import {ONE} from './one.js';
import {multiBitAdder} from './multiBitAdder.js';

export function multiBitIncrement(a, length) {
    return multiBitAdder({ a, b: [], c: ONE }, length).s;
}

export function increment8(a) {
    return multiBitIncrement(a, 8)
}

export function increment16(a) {
    return multiBitIncrement(a, 16)
}

export function increment32(a) {
    return multiBitIncrement(a, 32)
}

export function increment64(a) {
    return multiBitIncrement(a, 64)
}