import { Injectable } from '@angular/core';
import { EventLogEvent, Metadata, Topic } from '@data/types/eventlog.types';
import * as uuid from 'uuid';

const APP_INSTANCE_ID = 'appInstanceId';
const EVENT_LOG_EVENTS = 'eventLogEvents';

@Injectable({
  providedIn: 'root',
})
export class EventLogStorageService {
  constructor() {}

  storeEventInLocalStorage(event: EventLogEvent): void {
    const unparsedEvents = localStorage.getItem(EVENT_LOG_EVENTS);
    const existingEvents: EventLogEvent[] = unparsedEvents
      ? JSON.parse(unparsedEvents)
      : [];
    existingEvents.push(event);
    localStorage.setItem(EVENT_LOG_EVENTS, JSON.stringify(existingEvents));
  }

  initFromLocalStorage(): string {
    let appInstanceId = localStorage.getItem(APP_INSTANCE_ID);
    if (appInstanceId == null) {
      // user accesses dancer the first time from this device
      appInstanceId = uuid.v4();
      localStorage.setItem(APP_INSTANCE_ID, appInstanceId!);
      // store initial event in local storag
      const initialEvent: EventLogEvent = {
        topic: Topic.app_instance_id_created,
        metaData: {
          sourceTime: new Date().toISOString(),
          appInstanceId
        },
      }
      this.storeEventInLocalStorage(initialEvent)
    }
    return appInstanceId!;
  }
}
