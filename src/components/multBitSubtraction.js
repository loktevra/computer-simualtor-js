import {multiBitAdder} from './multiBitAdder.js'
import {not} from './not.js'
import {ONE} from './one.js'
import {padZero} from './zero.js'

export function multBitSubtraction({a, b}, length) {
    return multiBitAdder({a, b: padZero(b, length).map(not), c: ONE}, length).s
}

export function subtraction8(a, b) {
    return multBitSubtraction({a, b}, 8)
}

export function subtraction16(a, b) {
    return multBitSubtraction({a, b}, 16)
}

export function subtraction32(a, b) {
    return multBitSubtraction({a, b}, 32)
}

export function subtraction64(a, b) {
    return multBitSubtraction({a, b}, 64)
}