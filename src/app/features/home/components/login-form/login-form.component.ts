import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@data/services/authentication.service';
import { LoginRequest, LoginResponse } from '@data/types/authentication.types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  loginAttemptResponse: LoginResponse | undefined;
  hide = true

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

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
          this.loginAttemptResponse = response;
          if (response === 'SUCCESS') {
            this.router.navigate(['profile']);
          }
        });
    }
  }

}
