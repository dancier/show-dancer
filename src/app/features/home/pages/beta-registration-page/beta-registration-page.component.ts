import { Component } from '@angular/core';
import { SignupType } from '@features/home/types/signup.type';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { EventLogService } from '@data/services/event-log.service';

@Component({
  selector: 'app-beta-registration-page',
  templateUrl: './beta-registration-page.component.html',
  styleUrls: ['./beta-registration-page.component.scss'],
})
export class BetaRegistrationPageComponent{

  type: SignupType | undefined;

  constructor(
    private router: Router,
    private scroller: ViewportScroller,
    private eventLogService: EventLogService
  ) {}

  onTypeChange(type: SignupType): void {
    this.type = type;
    this.eventLogService.createAndPublishEvent('registration_format_selected', { type })
    if (type === 'contributor') {
      this.router.navigate(['contribute']);
    } else {
      this.scroller.scrollToAnchor('pageBottom')
    }
  }
}
