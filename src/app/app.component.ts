import { Component, inject, OnInit } from '@angular/core';
import { EventLogService } from '@shared/data-access/log/event-log.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AppInstanceStorageService } from '@shared/data-access/log/app-instance-storage.service';
import { EnvironmentService } from '@shared/data-access/environment.service';
import { DevToolsComponent } from '@shared/ui/dev-tools/dev-tools.component';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-dev-tools></app-dev-tools>
  `,
  imports: [RouterOutlet, DevToolsComponent],
})
export class AppComponent implements OnInit {
  private eventLogService = inject(EventLogService);
  private route = inject(ActivatedRoute);
  private appInstanceStorageService = inject(AppInstanceStorageService);
  private environment = inject(EnvironmentService);

  ngOnInit(): void {
    this.publishInitialPageRequestEvent();
    this.publishAdvertisementEvent();
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
