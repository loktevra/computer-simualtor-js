import {and} from './and.js';
import {ZERO} from './zero.js';
import {not} from './not.js';

export function nand(a = ZERO, b = ZERO) {
    return not(and(a, b));
}
