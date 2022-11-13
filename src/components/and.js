import {relay} from './relay.js'

export function and(a, b) {
    return relay(a, b).a;
}