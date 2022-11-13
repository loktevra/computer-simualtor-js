import {ONE} from './one.js'
import {relay} from './relay.js'

export function not(input) {
    return relay(input, ONE).b;
}