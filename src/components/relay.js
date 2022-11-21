import {combineLatest, map, distinctUntilChanged, interval} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {ZERO} from './zero.js';

export function relay(a = ZERO, b = ZERO) {
    const outA = combineLatest(a, b)
        .pipe(map(([a, b]) => {
            if (Number.isInteger(a) && Number.isInteger(b) && (a | b | 1 === 1)) {
                return a ? b : 0;
            }

            throw new Error(`invalid props typeof a: ${typeof a} typeof b ${typeof b}`);
        }))
        .pipe(debounce(val => interval(0)))
        .pipe(distinctUntilChanged());
    const outB = combineLatest(a, b)
        .pipe(map(([a, b]) => {
            if (Number.isInteger(a) && Number.isInteger(b) && (a | b | 1 === 1)) {
                return a ? 0 : b;
            }

            throw new Error(`invalid props typeof a: ${typeof a} typeof b ${typeof b}`);
        }))
        .pipe(debounce(val => interval(0)))
        .pipe(distinctUntilChanged());

    return {
        a: outA,
        b: outB
    }
}