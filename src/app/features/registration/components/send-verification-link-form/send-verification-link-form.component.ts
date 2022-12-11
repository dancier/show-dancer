import { Component, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APIError, APIResponse } from '@shared/http/response.types';
import { LinkType } from '@features/registration/registration.types';
import { EMPTY, Observable } from 'rxjs';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';

@Component({
  selector: 'app-send-verification-link-form',
  templateUrl: './send-verification-link-form.component.html',
  styleUrls: ['./send-verification-link-form.component.scss'],
})
export class SendVerificationLinkFormComponent implements OnInit {
  @Input() linkType!: LinkType;
  submitButtonText?: string;
  redirectUrl?: string;
  onSubmit!:
    | ((email: string) => Observable<APIResponse<void>>)
    | ((email: string) => never);
  error?: APIError;
  verificationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  isCaptchaSolved = false;
  captchaError = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public authStorageService: AuthStorageService
  ) {}

  ngOnInit(): void {
    this.submitButtonText =
      this.linkType === 'PASSWORD_RESET'
        ? 'Passwort zurücksetzen'
        : 'Aktivierungslink senden';
    this.redirectUrl =
      this.linkType === 'PASSWORD_RESET'
        ? 'reset-password-verification'
        : 'verify-account';
    this.onSubmit =
      this.linkType === 'PASSWORD_RESET'
        ? (email) => this.authenticationService.requestPasswordChange({ email })
        : (email) => this.authenticationService.requestEmailValidationCode({ email });
  }

  captchaResolved(captchaToken: string): void {
    this.authenticationService
      .loginAsHuman(captchaToken)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.isCaptchaSolved = true;
        } else {
          this.captchaError = true;
        }
      });
  }

  submitForm(): void {
    if (this.verificationForm.valid) {
      const { email } = this.verificationForm.value;

      this.onSubmit(email!).subscribe((response) => {
        if (response.isSuccess) {
          this.router.navigate([this.redirectUrl], {
            relativeTo: this.route.parent,
          });
        } else {
          this.error = response.error;
        }
      });
    }
  }
}
