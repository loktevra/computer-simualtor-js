import { NEVER, startWith } from 'rxjs';

export function one() {
    return NEVER.pipe(startWith(1))
}

export const ONE = one();
