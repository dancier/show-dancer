import { Component, Input, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthHttpService } from '@shared/data-access/auth/auth-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APIError, OldAPIResponse } from '@shared/util/http/response.types';
import { LinkType } from '../../util/registration.types';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@shared/data-access/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { RecaptchaModule } from 'ng-recaptcha';
import { DataTestDirective } from '@shared/util/data-test.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-send-verification-link-form',
  templateUrl: './send-verification-link-form.component.html',
  styleUrls: ['./send-verification-link-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    DataTestDirective,
    RecaptchaModule,
    MatButtonModule,
    AsyncPipe,
  ],
})
export class SendVerificationLinkFormComponent implements OnInit {
  @Input() linkType!: LinkType;
  submitButtonText?: string;
  redirectUrl?: string;
  onSubmit!:
    | ((email: string) => Observable<OldAPIResponse<void>>)
    | ((email: string) => never);
  error?: APIError;
  verificationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  isCaptchaSolved = false;
  captchaError = false;
  authData = toSignal(this.authStorageService.authData$);

  constructor(
    private fb: NonNullableFormBuilder,
    private authenticationService: AuthHttpService,
    private router: Router,
    private route: ActivatedRoute,
    public authStorageService: AuthService
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
        : (email) =>
            this.authenticationService.requestEmailValidationCode({ email });
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
