import {multiBitSelector} from './multiBitSelector.js';
import {multiBitArithmeticUnit} from './arithmeticUnit.js';
import {multiBitLogicUnit} from './logicUnit.js';
import {padZero} from './zero.js';

export function multiBitAlu(x, y, unit, op0, op1, zeroX, swap, length) {
    const xMaybeSwapped = multiBitSelector(x, y, swap, length);
    const yMaybeSwapped = multiBitSelector(y, x, swap, length);
    const xMaybeZero = multiBitSelector(xMaybeSwapped, padZero([], length), zeroX, length);

    return multiBitSelector(
        multiBitLogicUnit(xMaybeZero, yMaybeSwapped, op0, op1, length),
        multiBitArithmeticUnit(xMaybeZero, yMaybeSwapped, op0, op1, length),
        unit,
        length
    )
}

export function alu8(x, y, unit, op0, op1, zeroX, swap) {
    return multiBitAlu(x, y, unit, op0, op1, zeroX, swap, 8);
}

export function alu16(x, y, unit, op0, op1, zeroX, swap) {
    return multiBitAlu(x, y, unit, op0, op1, zeroX, swap, 16);
}

export function alu32(x, y, unit, op0, op1, zeroX, swap) {
    return multiBitAlu(x, y, unit, op0, op1, zeroX, swap, 32);
}

export function alu64(x, y, unit, op0, op1, zeroX, swap) {
    return multiBitAlu(x, y, unit, op0, op1, zeroX, swap, 64);
}