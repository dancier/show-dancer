import { inject, Injectable, NgZone } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';

// extend global Window object for Cypress testing purposes
declare global {
  interface Window {
    testRunnerEnvironment: boolean;
    emitTimer: (timerName: string) => void;
  }
}

/**
 * See TimerMockService for more information.
 */
@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timers: Map<string, Subject<number>> = new Map();

  zone = inject(NgZone);

  constructor() {
    if (window['testRunnerEnvironment'] === true) {
      this.registerEmitFunctionOnWindow();
    }
  }

  interval(name: string, period: number): Observable<number> {
    const subject = new Subject<number>();
    this.timers.set(name, subject);

    if (window['testRunnerEnvironment'] !== true) {
      interval(period).subscribe((value) => {
        subject.next(value);
      });
    }

    return subject.asObservable();
  }

  private registerEmitFunctionOnWindow(): void {
    window['emitTimer'] = (timerName: string) => {
      this.zone.run(() => {
        const timerSubject = this.timers.get(timerName);
        if (timerSubject === undefined) {
          throw new Error(
            `Timer ${timerName} has not been declared in TimerService`
          );
        }
        timerSubject.next(0);
      });
    };
  }
}
