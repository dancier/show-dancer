import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventLogService } from '@core/logging/event-log.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  standalone: true,
})
export class LandingPageComponent {
  constructor(private router: Router, private eventService: EventLogService) {}

  navigateToRegistration(): void {
    this.eventService.createAndPublishEvent('navigated_to_page', {
      origin: 'landing-page-hero-cta',
      page: 'registration',
    });
    this.router.navigate(['/registration']);
  }
}
