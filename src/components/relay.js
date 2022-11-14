import {combineLatest, map, distinctUntilChanged} from 'rxjs';
import {ZERO} from './zero.js';

export function relay(a = ZERO, b = ZERO) {
    const outA = combineLatest(a, b)
        .pipe(map(([a, b]) => {
            if (Number.isInteger(a) && Number.isInteger(b) && (a | b | 1 === 1)) {
                return a ? b : 0;
            }

            throw new Error(`invalid props typeof a: ${typeof a} typeof b ${typeof b}`);
        }))
        .pipe(distinctUntilChanged());
    const outB = combineLatest(a, b)
        .pipe(map(([a, b]) => {
            if (Number.isInteger(a) && Number.isInteger(b) && (a | b | 1 === 1)) {
                return a ? 0 : b;
            }

            throw new Error(`invalid props typeof a: ${typeof a} typeof b ${typeof b}`);
        }))
        .pipe(distinctUntilChanged());

    return {
        a: outA,
        b: outB
    }
}