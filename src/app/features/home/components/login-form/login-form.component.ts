import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, } from '@angular/forms';
import { AuthenticationService } from '@data/services/authentication.service';
import { LoginRequest } from '@data/types/authentication.types';
import { Router } from '@angular/router';
import { errorMessages } from '@data/constants/error-messages';
import { APIError } from '@data/types/shared.types';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  error?: APIError;
  hide = true;
  errorMessages = errorMessages;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  private initReactiveForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public errorHandling(control: string, error: string): boolean {
    return this.loginForm.controls[control].hasError(error);
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.authService
        .onceUserLoggedIn(this.loginForm.value as LoginRequest)
        .subscribe((response) => {
          if (response.status === 'SUCCESS') {
            this.router.navigate(['profile']);
          } else {
            this.error = response.error;
          }
        });
    }
  }
}
