import {multiBitSelector} from './multiBitSelector.js';
import {multiBitAdder} from './multiBitAdder.js';
import {multBitSubtraction} from './multBitSubtraction.js';
import {multiBitIncrement} from './multiBitIncrement.js';
import {multiBitDecrement} from './decrement.js';
import {padZero} from './zero.js';

export function multiBitArithmeticUnit(x, y, op0, op1, length) {
    x = padZero(x, length);
    y = padZero(y, length);

    return multiBitSelector(
        multiBitSelector(
            multiBitAdder({a: x, b: y}, length).s,
            multBitSubtraction({a: x, b: y}, length),
            op1,
            length
        ),
        multiBitSelector(
            multiBitIncrement(x, length),
            multiBitDecrement(x, length),
            op1,
            length
        ),
        op0,
        length
    )
}

export function arithmeticUnit8(x, y, op0, op1) {
    return multiBitArithmeticUnit(x, y, op0, op1, 8);
}

export function arithmeticUnit16(x, y, op0, op1) {
    return multiBitArithmeticUnit(x, y, op0, op1, 16);
}

export function arithmeticUnit32(x, y, op0, op1) {
    return multiBitArithmeticUnit(x, y, op0, op1, 32);
}

export function arithmeticUnit64(x, y, op0, op1) {
    return multiBitArithmeticUnit(x, y, op0, op1, 64);
}
