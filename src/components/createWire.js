import {Observable, distinctUntilChanged, interval, share, Subject} from 'rxjs';
import {debounce} from 'rxjs/operators';

export function createWire() {
    let source;

    let subscriber
    let subject = new Observable((o) => {
        subscriber = o;
        subscriber.next(0);
    });
    subject = subject
        .pipe(debounce(val => interval(0)))
        .pipe(distinctUntilChanged())
        .pipe(share());

    return {
        setSource(newSource) {
            if (!source) {
                source = newSource;
                source.subscribe(x => subscriber.next(x));
            }
        },
        getSource() {
            return subject;
        }
    }
}