import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventLogService } from '@core/logging/event-log.service';
import { ActivatedRoute } from '@angular/router';
import { AppInstanceStorageService } from '@core/logging/app-instance/app-instance-storage.service';
import { ChatService } from '@features/chat/common/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private eventLogService: EventLogService,
    private route: ActivatedRoute,
    private appInstanceStorageService: AppInstanceStorageService,
    private chatService: ChatService // needs to be initialized from the start
  ) {}

  ngOnInit(): void {
    this.publishInitialPageRequestEvent();
    this.publishAdvertisementEvent();
  }

  ngOnDestroy(): void {
    this.chatService.stopPollingForChats()
  }

  publishInitialPageRequestEvent(): void {
    const isInitialPageRequest =
      this.appInstanceStorageService.isInitialPageRequest();
    if (isInitialPageRequest) {
      this.appInstanceStorageService.initializeAppInstanceId();
      this.eventLogService.createAndPublishEvent('app_instance_id_created');
    }
  }

  publishAdvertisementEvent(): void {
    this.route.queryParams.subscribe((params) => {
      // If the user accesses the page via an advertisement a dedicated event will be published
      const campaign = params['ad'];
      if (campaign != undefined) {
        this.eventLogService.createAndPublishEvent(
          'page_request_via_advertisement',
          { campaign }
        );
      }
    });
  }
}
