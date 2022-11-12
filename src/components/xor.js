import { and } from "./and.js";
import { ZERO } from "./zero.js";
import {or} from './or.js';
import {nand} from './nand.js';

export function xor(a = ZERO, b = ZERO) {
    return and(or(a, b), nand(a, b));
}
