import { Injectable } from '@angular/core';
import { Event, Topic } from './eventlog.types';
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

  createAndPublishEvent(topic: Topic, payload: any = {}): void {
    const appInstanceId = this.appInstanceStorageService.getAppIntanceId()!;
    this.eventLogHttpService
      .postEvent$(this.createEvent(appInstanceId, topic, payload))
      .subscribe();
  }

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
}
