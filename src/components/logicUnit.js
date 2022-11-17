import {multiBitSelector} from './multiBitSelector.js';
import {or} from './or.js';
import {and} from './and.js';
import {xor} from './xor.js';
import {not} from './not.js';
import {padZero} from './zero.js';

export function multiBitLogicUnit(x, y, op0, op1, length) {
    x = padZero(x, length);
    y = padZero(y, length);

    return multiBitSelector(
        multiBitSelector(
            x.map((_, i) => and(x[i], y[i])),
            x.map((_, i) => or(x[i], y[i])),
            op0,
            length
        ),
        multiBitSelector(
            x.map((_, i) => xor(x[i], y[i])),
            x.map((_, i) => not(x[i])),
            op0,
            length
        ),
        op1,
        length
    )
}

export function logicUnit8(x, y, op0, op1) {
    return multiBitLogicUnit(x, y, op0, op1, 8);
}

export function logicUnit16(x, y, op0, op1) {
    return multiBitLogicUnit(x, y, op0, op1, 16);
}

export function logicUnit32(x, y, op0, op1) {
    return multiBitLogicUnit(x, y, op0, op1, 32);
}

export function logicUnit64(x, y, op0, op1) {
    return multiBitLogicUnit(x, y, op0, op1, 64);
}