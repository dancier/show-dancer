import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APIError, APIResponse } from '@shared/http/response.types';
import { LinkType } from '@features/registration/registration.types';
import { EMPTY, empty, Observable } from 'rxjs';

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
  verificationForm!: UntypedFormGroup;
  error?: APIError;

  constructor(
    private fb: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
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
        : () => EMPTY;
  }

  private initReactiveForm(): void {
    this.verificationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submitForm(): void {
    if (this.verificationForm.valid) {
      const { email } = this.verificationForm.value;

      this.onSubmit(email).subscribe((response) => {
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
