import { Injectable } from '@angular/core';
import { Event, Topic } from '@data/types/eventlog.types';
import { AppInstanceStorageService } from './app-instance-storage.service';
import { EventLogHttpService } from './event-log-http.service';

@Injectable({
  providedIn: 'root',
})
export class EventLogService {
  constructor(
    private eventLogHttpService: EventLogHttpService,
    private appInstanceStorageService: AppInstanceStorageService
  ) {}

  private createEvent(
    appInstanceId: string,
    topic: Topic,
    payload: any = {}
  ): Event {
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
      this.createAndPublishEvent('app_instance_id_created');
    }
  }

  createAndPublishEvent(topic: Topic, payload: any = {}): void {
    const appInstanceId = this.appInstanceStorageService.getAppIntanceId()!;
    this.eventLogHttpService
      .postEvent$(this.createEvent(appInstanceId, topic, payload))
      .subscribe();
  }
}
