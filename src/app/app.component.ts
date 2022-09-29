import { Component, OnInit } from '@angular/core';
import { EventLogService } from '@data/services/event-log.service';
import { ActivatedRoute } from '@angular/router';
import { AppInstanceStorageService } from '@core/logging/app-instance/app-instance-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private eventLogService: EventLogService,
    private route: ActivatedRoute,
    private appInstanceStorageService: AppInstanceStorageService
  ) {}

  ngOnInit(): void {
    this.publishInitialPageRequestEvent();
    this.publishAdvertisementEvent();
  }

  publishInitialPageRequestEvent(): void {
    const isInitialPageRequest = this.appInstanceStorageService.isInitialPageRequest();
    if (isInitialPageRequest) {
      this.appInstanceStorageService.initializeAppInstanceId()
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
