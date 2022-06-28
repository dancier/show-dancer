import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@data/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit, OnDestroy {
  logoutSubscription: Subscription | undefined;

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.logoutSubscription = this.authService.onceUserLoggedOut().subscribe();
  }
}
