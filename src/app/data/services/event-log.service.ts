import { Injectable } from '@angular/core';
import {
  EventLogEvent,
  PostEventResponse,
  Topic,
} from '@data/types/eventlog.types';
import { mergeMap, Observable, Subject, switchMap } from 'rxjs';
import { AppInstanceStorageService } from './app-instance-storage.service';
import { EventLogHttpService } from './event-log-http.service';

@Injectable({
  providedIn: 'root',
})
export class EventLogService {
  _eventObservable$ = new Subject<EventLogEvent>();

  constructor(
    public eventLogHttpService: EventLogHttpService,
    public appInstanceStorageService: AppInstanceStorageService
  ) {}

  private pushEvent(event: EventLogEvent): void {
    this._eventObservable$.next(event);
  }
  private createEvent(
    appInstanceId: string,
    topic: Topic,
    payload: any = {}
  ): EventLogEvent {
    return {
      topic,
      metaData: {
        sourceTime: new Date().toISOString(),
        appInstanceId,
      },
      payload,
    };
  }

  handleInitialUserAccess(): void {
    const appInstanceId = this.appInstanceStorageService.getAppIntanceId();
    if (appInstanceId == null) {
      // user accesses dancer the first time from this device
      this.appInstanceStorageService.initializeAppInstanceId();
      // publish event for initial access
      this.createAndPublishEvent(Topic.APP_INSTANCE_ID_CREATED);
    }
  }

  getEventObservable(): Observable<PostEventResponse> {
    return this._eventObservable$.pipe(
      mergeMap((event) => this.eventLogHttpService.postEvent(event))
    );
  }

  createAndPublishEvent(
    topic: Topic,
    payload: any = {}
  ): void {
    const appInstanceId = this.appInstanceStorageService.getAppIntanceId()!
    this.pushEvent(this.createEvent(appInstanceId, topic, payload));
  }
}
