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

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.initReactiveForm();
  }


  private initReactiveForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public errorHandling(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }

  submitForm() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.authService
        .onceUserLoginAttempt(this.loginForm.value as LoginRequest)
        .subscribe((response) => {
          console.log('returned', response)
          this.loginAttemptResponse = response;
          if (response === 'SUCCESS') {
            this.router.navigate(['profile']);
          }
        });
      // this.authenticationService
      //   .registerUser(this.registrationForm.value as UserRegistration)
      //   .subscribe({
      //     next: () => {
      //       console.log('success');
      //     },
      //     error: (err) => {
      //       console.log('something terrible happened', err);
      //     }
      //   });
    }
  }

}
