import {and} from './and.js';
import {not} from './not.js';

export function nand(a, b) {
    return not(and(a, b));
}
