import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationResponse } from '@data/types/authentication.types';
import { AuthenticationService } from '@data/services/authentication.service';
import { Router } from '@angular/router';
import { AuthStorageService } from '@data/services/auth-storage.service';
import { EventLogService } from '@data/services/event-log.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  //TODO @Dominik @ Jan please check if I'm calling the correct endpoint
  contactForm!: FormGroup;
  contactUsAttemptResponse: RegistrationResponse | undefined;
  loggedInAsHuman = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    public authStorageService: AuthStorageService,
    private eventLogService: EventLogService,
  ) {}

  private initReactiveForm(): void {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', []] //TODO @Jan @Dominik please check if Validators are needed
    });
  }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      const { email } = this.contactForm.value;
      let message = `Contact Us - impressum`;

      this.authenticationService
        .onceUserRegisteredForBeta({ sender: email, message: message })
        .pipe(
          tap((response) => {
            if (response === 'SUCCESS') {
              this.eventLogService.createAndPublishEvent(
                'beta_registration_succeeded',
                {
                  type: 'contact us', //TODO @Jan @Dominik not sure if the type is needed for contact form, please align with Marc
                  sender: email
                }
              )
            }
          })
        )
        .subscribe((response) => {
          this.contactUsAttemptResponse = response;
          if (response === 'SUCCESS') {
            // TODO Handle success!
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
