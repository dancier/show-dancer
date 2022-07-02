import { Injectable } from '@angular/core';
import {
  EventLogEvent,
  PostEventResponse,
  Topic,
} from '@data/types/eventlog.types';
import { Observable, Subject, switchMap } from 'rxjs';
import { AppInstanceStorageService } from './app-instance-storage.service';
import { EventLogHttpService } from './event-log-http.service';

@Injectable({
  providedIn: 'root',
})
export class EventLogService {
  _eventObservable = new Subject<EventLogEvent>();

  constructor(
    public eventLogHttpService: EventLogHttpService,
    public appInstanceStorageService: AppInstanceStorageService
  ) {}

  getEventObservable(): Observable<PostEventResponse> {
    return this._eventObservable.pipe(
      switchMap((event) => this.eventLogHttpService.postEvent(event))
    );
  }

  createEvent(
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
    let appInstanceId = this.appInstanceStorageService.getAppIntanceId();
    if (appInstanceId == null) {
      // user accesses dancer the first time from this device
      appInstanceId = this.appInstanceStorageService.initializeAppInstanceId();
      // publish event for initial access
      const initialEvent = this.createEvent(
        appInstanceId!,
        Topic.APP_INSTANCE_ID_CREATED
      );
      this.pushEvent(initialEvent);
    }
  }

  pushEvent(event: EventLogEvent): void {
    this._eventObservable.next(event);
  }
}
