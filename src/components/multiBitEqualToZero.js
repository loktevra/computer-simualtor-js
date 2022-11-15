import {not} from './not.js';
import {and} from './and.js';
import {padZero} from './zero.js';

export function multiBitEqualToZero(a, length) {
    a = padZero(a, length);

    let result = not(a[0]);

    for (let i = 1; i < a.length; i++) {
        result = and(result, not(a[i]));
        
    }

    return result
}

export function equalToZero8(a) {
    return multiBitEqualToZero(a, 8)
}

export function equalToZero16(a) {
    return multiBitEqualToZero(a, 16)
}

export function equalToZero32(a) {
    return multiBitEqualToZero(a, 32)
}

export function equalToZero64(a) {
    return multiBitEqualToZero(a, 64)
}