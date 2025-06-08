import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from '@shared/data-access/auth/auth-http.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@shared/data-access/auth/auth.service';

@Component({
  selector: 'app-logout-page',
  template: ``,
  standalone: true,
})
export class LogoutPageComponent implements OnInit, OnDestroy {
  private authService = inject(AuthHttpService);
  private authStorageService = inject(AuthService);
  private router = inject(Router);

  logoutSubscription: Subscription | undefined;

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.logoutSubscription = this.authService
      .logout()
      .subscribe(() => this.router.navigate(['/']));
  }
}
