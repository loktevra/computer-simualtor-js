import {ZERO} from './zero.js';
import {relay} from './relay.js'

export function and(a = ZERO, b = ZERO) {
    return relay(a, b).a;
}