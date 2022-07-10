import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@data/services/authentication.service';
import { RegistrationResponse } from '@data/types/authentication.types';

@Component({
  selector: 'app-beta-registration-page',
  templateUrl: './beta-registration-page.component.html',
  styleUrls: ['./beta-registration-page.component.scss'],
})
export class BetaRegistrationPageComponent implements OnInit {
  betaRegistrationForm!: FormGroup;
  betaRegistrationAttemptResponse: RegistrationResponse | undefined;
  loggedInAsHuman = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
    ) {}

  private initReactiveForm(): void {
    this.betaRegistrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  submitForm(): void {
    if (this.betaRegistrationForm.valid) {
      const { email } =
        this.betaRegistrationForm.value;
      this.authenticationService
        .onceUserRegisteredForBeta({ sender: email, message: `${email} registered for beta` })
        .subscribe((response) => {
          this.betaRegistrationAttemptResponse = response;
          if (response === 'SUCCESS') {
            this.router.navigate(['beta-registration-success'])
          }
        });
    }
  }

  captchaResolved(captchaToken: string): void {
    this.authenticationService
      .onceHumanLoggedIn(captchaToken)
      .subscribe((response) => {
        if (response === 'SUCCESS') {
          console.info('human session created');
          this.loggedInAsHuman = true;
        } else {
          console.error('error while establishing human session');
        }
      });
  }
}
