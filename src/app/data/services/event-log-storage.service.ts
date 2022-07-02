import { Injectable } from '@angular/core';
import { EventLogEvent, Metadata, Topic } from '@data/types/eventlog.types';
import { Observable, Subject } from 'rxjs';
import * as uuid from 'uuid';

const APP_INSTANCE_ID = 'appInstanceId';
const EVENT_LOG_EVENTS = 'eventLogEvents';

@Injectable({
  providedIn: 'root',
})
export class EventLogStorageService {
  _eventObservable = new Subject<EventLogEvent>()

  constructor() {}

  getEventObservable(): Observable<EventLogEvent> {
    return this._eventObservable
  }

  initFromLocalStorage(): string {
    let appInstanceId = localStorage.getItem(APP_INSTANCE_ID);
    if (appInstanceId == null) {
      // user accesses dancer the first time from this device
      appInstanceId = uuid.v4();
      // eslint-disable-next-line no-console
      console.log('new event');
      localStorage.setItem(APP_INSTANCE_ID, appInstanceId!);
      // store initial event in local storage
      const initialEvent: EventLogEvent = {
        topic: Topic.app_instance_id_created,
        metaData: {
          sourceTime: new Date().toISOString(),
          appInstanceId,
        },
      };
      this._eventObservable.next(initialEvent)
    }
    return appInstanceId!;
  }

}
