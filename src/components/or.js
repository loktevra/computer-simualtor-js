import { nand } from "./nand.js";
import { ZERO } from "./zero.js";
import {not} from './not.js';

export function or(a = ZERO, b = ZERO) {
    return nand(not(a), not(b));
}
