import {or} from "./or.js";
import {ZERO} from './zero.js';
import {halfAdd} from './halfAdd.js';

export function add(a = ZERO, b = ZERO, c = ZERO) {
    const hAdd = halfAdd(a, b)
    const lAdd = halfAdd(hAdd.l, c)

    return {
        h: or(hAdd.h, lAdd.h),
        l: lAdd.l
    }
}