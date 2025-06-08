import { Component, OnInit, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthHttpService } from '@shared/data-access/auth/auth-http.service';
import { LoginRequest } from '@shared/data-access/auth/authentication.types';
import { Router, RouterLink } from '@angular/router';
import { APIError } from '@shared/util/http/response.types';
import { ErrorMessagePipe } from '@shared/util/http/error-message.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataTestDirective } from '@shared/util/data-test.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DataTestDirective,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ErrorMessagePipe,
  ],
})
export class LoginFormComponent implements OnInit {
  private fb = inject(UntypedFormBuilder);
  private authService = inject(AuthHttpService);
  private router = inject(Router);

  loginForm!: UntypedFormGroup;
  hide = true;
  error?: APIError;

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
