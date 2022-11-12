import {ZERO} from "./zero.js";
import {and} from './and.js';
import {xor} from './xor.js';

export function halfAdder(a = ZERO, b = ZERO) {
    return {
        h: and(a, b),
        l: xor(a, b)
    }
}
