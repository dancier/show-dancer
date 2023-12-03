import { Component, Input, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '@shared/data-access/auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APIError, APIResponse } from '@shared/util/http/response.types';
import { LinkType } from '../../../registration.types';
import { Observable } from 'rxjs';
import { AuthStorageService } from '@shared/data-access/auth/auth-storage.service';
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
  standalone: true,
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
