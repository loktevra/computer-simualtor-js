import {selector} from './multiBitSelector.js';
import {createWire} from './createWire.js';

export function latch(d, st) {
    const wire = createWire();
    const r = selector(wire.getSource(), d, st);
    wire.setSource(r);

    return r
}
