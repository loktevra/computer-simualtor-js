import { NEVER, startWith } from 'rxjs';

export function zero() {
    return NEVER.pipe(startWith(0))
}

export const ZERO = zero();

export function padZero(bus, length) {
    if (bus.length >= length) {
        return bus.slice(0, length);
    }

    return [...bus, ...(new Array(length - bus.length)).fill(ZERO)];
}