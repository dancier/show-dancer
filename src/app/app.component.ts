import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventLogService } from '@data/services/event-log.service';
import { EventLogHttpService } from '@data/services/event-log-http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  eventObservableSubscription: Subscription | undefined;

  constructor(
    public eventLogService: EventLogService,
    public eventLogSHttpervice: EventLogHttpService
  ) {}

  ngOnInit(): void {
    this.eventObservableSubscription = this.eventLogService
      .getEventObservable()
      .subscribe();
    this.eventLogService.handleInitialUserAccess();
  }

  ngOnDestroy(): void {
    this.eventObservableSubscription?.unsubscribe();
  }
}
