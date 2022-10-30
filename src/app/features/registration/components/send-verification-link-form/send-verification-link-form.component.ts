import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APIError } from '@shared/http/response.types';

@Component({
  selector: 'app-send-verification-link-form',
  templateUrl: './send-verification-link-form.component.html',
  styleUrls: ['./send-verification-link-form.component.scss'],
})
export class SendVerificationLinkFormComponent implements OnInit {
  @Input() submitText?: string;
  submitButtonText?: string;
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
  }

  private initReactiveForm(): void {
    this.verificationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submitForm(): void {
    if (this.verificationForm.valid) {
      const { email } = this.verificationForm.value;

      this.authenticationService
        .requestPasswordChange({ email })
        .subscribe((response) => {
          if (response.isSuccess) {
            this.router.navigate(['reset-password-verification'], {
              relativeTo: this.route.parent,
            });
          } else {
            this.error = response.error;
          }
        });
    }
  }
}
