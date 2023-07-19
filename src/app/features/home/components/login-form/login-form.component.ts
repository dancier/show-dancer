import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { LoginRequest } from '@core/auth/authentication.types';
import { Router, RouterLink } from '@angular/router';
import { APIError } from '@shared/http/response.types';
import { ErrorMessagePipe } from '@shared/http/error-message.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { DataTestDirective } from '@shared/directives/data-test.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DataTestDirective,
    NgIf,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ErrorMessagePipe,
  ],
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
            this.router.navigate(['recommendations']);
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
