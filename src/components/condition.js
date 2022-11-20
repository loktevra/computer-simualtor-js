import {and} from './and.js';
import {or} from './or.js';
import {multiBitLessThanZero} from './multiBitLessThanZero.js';
import {multiBitEqualToZero} from './multiBitEqualToZero.js';
import {not} from './not.js';
import {xor} from './xor.js';

export function multiBitCondition(x, lt, eq, gt, length) {
    const isLessThanZero = multiBitLessThanZero(x, length);
    const isZero = multiBitEqualToZero(x, length);

    return or(
        or(
            and(lt, isLessThanZero),
            and(eq, isZero),
        ),
        and(gt, not(xor(isLessThanZero, isZero)))
    )
}

export function condition8(x, lt, eq, gt) {
    return multiBitCondition(x, lt, eq, gt, 8);
}

export function condition16(x, lt, eq, gt) {
    return multiBitCondition(x, lt, eq, gt, 16);
}

export function condition32(x, lt, eq, gt) {
    return multiBitCondition(x, lt, eq, gt, 32);
}

export function condition64(x, lt, eq, gt) {
    return multiBitCondition(x, lt, eq, gt, 64);
}
