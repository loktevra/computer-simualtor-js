import {or} from "./or.js";
import {halfAdder} from './halfAdder.js';

export function adder(a, b, c) {
    const hAdd = halfAdder(a, b)
    const lAdd = halfAdder(hAdd.l, c)

    return {
        h: or(hAdd.h, lAdd.h),
        l: lAdd.l
    }
}