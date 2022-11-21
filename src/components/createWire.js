import {Observable, distinctUntilChanged} from 'rxjs';

export function createWire() {
    let source;
    let outSubscriber
    const outSource = new Observable((subscriber) => {
        outSubscriber = subscriber;
        outSubscriber.next(0);
    }).pipe(distinctUntilChanged());

    return {
        setSource(newSource) {
            if (!source) {
                source = newSource;
                source.subscribe(x => outSubscriber.next(x));
            }
        },
        getSource() {
            return outSource
        }
    }
}