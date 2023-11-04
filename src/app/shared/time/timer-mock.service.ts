import { Injectable, signal } from '@angular/core';
import { TimerService } from './timer.service';
import { Observable, of } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

/**
 * Mocks the TimerService for use in tests.
 *
 * A problem we ran into is that normal RxJS interval() seem to cause problems
 * with unit (Jest) and component (Cypress) tests.
 *
 * This is a workaround that when used in tests instead of the real TimerService,
 * allows the test to control when the timer fires.
 */
@Injectable({
  providedIn: 'root',
})
export class TimerMockService extends TimerService {
  shouldEmit = false;
  // source$ = interval(10).pipe(
  //   filter(() => this.shouldEmit),
  //   tap(() => (this.shouldEmit = false)),
  //   tap(() => console.log('fake timer fired'))
  // );
  // source$ = new BehaviorSubject<number>(0);

  value = signal(0);
  value$;

  constructor() {
    super();
    console.warn('FAKE TimerService created');
    this.value$ = toObservable(this.value);
  }

  emit(_value: number): void {
    this.zone.run(() => {});
    // this.shouldEmit = true;
    // console.log('fake timer emit', value);
    // this.source$.next(value);
  }

  override interval(_name: string, _period: number): Observable<number> {
    // console.log('using fake interval');
    // return this.value$;
    // return this.source$.asObservable();
    return of(0).pipe();
  }
}
