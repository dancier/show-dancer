import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@data/services/authentication.service';
import { Router } from '@angular/router';
import { AuthStorageService } from '@data/services/auth-storage.service';
import { RegistrationResponse } from '@data/types/authentication.types';
import { SignupType } from '@features/home/types/signup.type';
import { tap } from 'rxjs';
import { EventLogService } from '@data/services/event-log.service';

@Component({
  selector: 'app-beta-signup-form',
  templateUrl: './beta-signup-form.component.html',
  styleUrls: ['./beta-signup-form.component.scss']
})
export class BetaSignupFormComponent implements OnInit {

  @Input() signupType: SignupType = 'participant';

  betaRegistrationForm!: FormGroup;
  betaRegistrationAttemptResponse: RegistrationResponse | undefined;
  loggedInAsHuman = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    public authStorageService: AuthStorageService,
    private eventLogService: EventLogService,
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
      const { email } = this.betaRegistrationForm.value;
      let message = '';
      if (this.signupType === 'contributor') {
        message = `🚀 ${email} registered as a contributor! 🚀`;
      } else {
        message = `💃 ${email} registered for beta 🕺`;
      }

      this.authenticationService
        .onceUserRegisteredForBeta({ sender: email, message: message })
        .pipe(
          tap((response) => {
            if (response === 'SUCCESS') {
              this.eventLogService.createAndPublishEvent(
                'beta_registration_succeeded',
                {
                  type: this.signupType,
                  sender: email
                }
              )
            }
          })
        )
        .subscribe((response) => {
          this.betaRegistrationAttemptResponse = response;
          if (response === 'SUCCESS') {
            if (this.signupType === 'contributor') {
              this.router.navigate(['contributor-registration-success']);
            } else {
              this.router.navigate(['beta-registration-success']);
            }
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
        } else {
          console.error('error while establishing human session');
        }
      });
  }

}
