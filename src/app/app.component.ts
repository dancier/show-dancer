import { Component, OnInit } from '@angular/core';
import { EventLogService } from '@data/services/event-log.service';
import { ActivatedRoute } from '@angular/router';
import { AppInstanceStorageService } from '@data/services/app-instance-storage.service';
import { AuthenticationService } from '@data/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private eventLogService: EventLogService,
    private route: ActivatedRoute,
    private appInstanceStorageService: AppInstanceStorageService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.checkForOutdatedSession();
    this.checkForInitialPageRequest();
    this.checkForAdvertisement();
  }

  checkForOutdatedSession(): void {
    this.authenticationService.invalidateOldSession();
  }

  checkForInitialPageRequest(): void {
    const isInitialPageRequest =
      this.appInstanceStorageService.isInitialPageRequest();
    if (isInitialPageRequest) {
      this.eventLogService.createAndPublishEvent('app_instance_id_created');
    }
  }

  checkForAdvertisement(): void {
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
