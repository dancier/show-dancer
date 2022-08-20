import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@data/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { isSuccess } from '@data/types/either';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit, OnDestroy {

  verifySubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.verifySubscription = this.route.params.pipe(
      switchMap((params) => {
        const verifyCode: string = params['code'];
        return this.authService.onceAccountVerified(verifyCode);
      })
    ).subscribe(response => {
      if (isSuccess(response)) {
        this.router.navigate(['profile', 'initial-setup']);
      } else {
        this.router.navigate(['verify', 'error'], { relativeTo: this.route.parent });
      }
    });
  }

  ngOnDestroy(): void {
    this.verifySubscription?.unsubscribe();
  }

}
