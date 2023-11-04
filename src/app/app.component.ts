import { Component, inject, OnInit } from '@angular/core';
import { EventLogService } from '@shared/logging/event-log.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AppInstanceStorageService } from '@shared/logging/app-instance/app-instance-storage.service';
import { DancierBackendMockedService } from '@shared/common/dancier-backend-mocked.service';
import { EnvironmentService } from '@shared/common/environment.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  private eventLogService = inject(EventLogService);
  private route = inject(ActivatedRoute);
  private appInstanceStorageService = inject(AppInstanceStorageService);
  private environment = inject(EnvironmentService);
  private dancierMockBackend = inject(DancierBackendMockedService);

  ngOnInit(): void {
    this.publishInitialPageRequestEvent();
    this.publishAdvertisementEvent();
    this.enableMockedBackend();
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

  private enableMockedBackend(): void {
    if (this.environment.isMockBackendEnabled()) {
      this.dancierMockBackend.mirageJsServer();
    }
  }
}
