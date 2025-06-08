import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthHttpService } from '@shared/data-access/auth/auth-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  standalone: true,
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthHttpService);

  verifySubscription: Subscription | undefined;

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
