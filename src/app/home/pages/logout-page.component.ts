import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@shared/data-access/auth/authentication.service';
import { Subscription } from 'rxjs';
import { AuthStorageService } from '@shared/data-access/auth/auth-storage.service';

@Component({
  selector: 'app-logout-page',
  template: ``,
  standalone: true,
})
export class LogoutPageComponent implements OnInit, OnDestroy {
  logoutSubscription: Subscription | undefined;

  constructor(
    private authService: AuthenticationService,
    private authStorageService: AuthStorageService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.logoutSubscription = this.authService
      .logout()
      .subscribe(() => this.router.navigate(['/']));
  }
}
