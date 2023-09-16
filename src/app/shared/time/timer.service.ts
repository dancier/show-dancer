import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

/**
 * See TimerMockService for more information.
 */
@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {
    console.warn('REAL TimerService created');
  }
  interval(period: number): Observable<number> {
    // return of(0);
    return interval(period);
  }
}
