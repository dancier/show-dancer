import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  verifySubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.verifySubscription = this.route.params
      .pipe(
        switchMap((params) => {
          const verifyCode: string = params['code'];
          return this.authService.verifyAccount(verifyCode);
        })
      )
      .subscribe((response) => {
        if (response.isSuccess) {
          this.router.navigate(['profile', 'initial-setup']);
        } else {
          this.router.navigate(['verify', 'error'], {
            relativeTo: this.route.parent,
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.verifySubscription?.unsubscribe();
  }
}
