import {ZERO} from './zero.js'
import {ONE} from './one.js'
import {relay} from './relay.js'

export function not(input = ZERO) {
    return relay(input, ONE).b;
}