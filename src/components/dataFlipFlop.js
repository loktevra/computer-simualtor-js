import {and} from './and.js';
import {not} from './not.js';
import {latch} from './latch.js';

export function dataFlipFlop(digit, state, clock) {
    return latch(
        latch(
            digit,
            and(state, not(clock))
        ),
        clock
    );
}
