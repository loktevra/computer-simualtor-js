import {and} from './and.js';
import {xor} from './xor.js';

export function halfAdder(a, b) {
    return {
        h: and(a, b),
        l: xor(a, b)
    }
}
