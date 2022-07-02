import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@data/services/authentication.service';
import { Subscription } from 'rxjs';
import { AuthStorageService } from '@data/services/auth-storage.service';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
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
      .onceUserLoggedOut()
      .subscribe(() => this.router.navigate(['/']));
  }
}
