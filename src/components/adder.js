import {or} from "./or.js";
import {ZERO} from './zero.js';
import {halfAdder} from './halfAdder.js';

export function adder(a = ZERO, b = ZERO, c = ZERO) {
    const hAdd = halfAdder(a, b)
    const lAdd = halfAdder(hAdd.l, c)

    return {
        h: or(hAdd.h, lAdd.h),
        l: lAdd.l
    }
}