import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventLogStorageService } from '@data/services/event-log-storage.service';
import { EventLogService } from '@data/services/event-log.service';
import { EventLogEvent } from '@data/types/eventlog.types';
import { flatMap, map, mergeMap, Observable, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  eventObservableSubscription: Subscription | undefined;

  constructor(
    public eventLogStorageService: EventLogStorageService,
    public eventLogService: EventLogService
  ) {}

  ngOnInit(): void {
    this.eventObservableSubscription = this.eventLogStorageService
      .getEventObservable()
      .pipe(
        mergeMap(event => this.eventLogService.postEvent(event))
      )
      .subscribe();
    this.eventLogStorageService.initFromLocalStorage();
  }

  ngOnDestroy(): void {
    this.eventObservableSubscription?.unsubscribe();
  }
}
