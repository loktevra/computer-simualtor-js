import {combineLatest, map, distinctUntilChanged} from 'rxjs';
import {zero} from './zero.js';
import {one} from './one.js'

export function relayOn(a = zero(), b = one()) {
    return combineLatest(a, b)
        .pipe(map(([a, b]) => {
            if (Number.isInteger(a) && Number.isInteger(b) && (a | b | 1 === 1)) {
                return a ? 0 : b;
            }

            throw new Error('invalid props for logical AND');
        }))
        .pipe(distinctUntilChanged());
}