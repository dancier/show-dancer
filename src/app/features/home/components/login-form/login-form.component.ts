import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { LoginRequest } from '@core/auth/authentication.types';
import { Router } from '@angular/router';
import { APIError } from '@shared/http/response.types';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  hide = true;
  error?: APIError;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  public errorHandling(control: string, error: string): boolean {
    return this.loginForm.controls[control].hasError(error);
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value as LoginRequest)
        .subscribe((response) => {
          if (response.isSuccess) {
            this.router.navigate(['profile']);
          } else {
            this.error = response.error;
          }
        });
    }
  }

  resendLink(): void {
    this.authService
      .requestEmailValidationCode({ email: this.loginForm.value.email })
      .subscribe((response) => {
        if (response.isSuccess) {
          this.router.navigate(['registration/resend-verification-link']);
        } else {
          this.error = response.error;
        }
      });
  }

  private initReactiveForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
