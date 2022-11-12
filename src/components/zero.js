import { NEVER, startWith } from 'rxjs';

export function zero() {
    return NEVER.pipe(startWith(0))
}

export const ZERO = zero();