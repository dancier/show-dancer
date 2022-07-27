import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '@data/services/contact.service';
import { ContactResponse } from '@data/types/contact.types';
import { Subscription, tap } from 'rxjs';
import { AuthStorageService } from '@data/services/auth-storage.service';
import { AuthenticationService } from '@data/services/authentication.service';
import { Router } from '@angular/router';
import { EventLogService } from '@data/services/event-log.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  contactForm!: FormGroup;
  contactResponse: ContactResponse | undefined;
  contactServiceSub: Subscription | undefined;
  humanSessionResponse: 'SUCCESS' | 'ERROR' | undefined;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    public authStorageService: AuthStorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private eventLogService: EventLogService,
  ) { }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  ngOnDestroy(): void {
    this.contactServiceSub?.unsubscribe();
  }

  private initReactiveForm(): void {
    this.contactForm = this.fb.group({
      message: ['', [Validators.required]],
      email: ['', [Validators.email]],
    });
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      const { message, email } = this.contactForm.value;

      this.contactServiceSub = this.contactService
        .sendMessage(message, email)
        .pipe(
          tap((response) => {
            if (response === 'SUCCESS') {
              this.eventLogService.createAndPublishEvent(
                'contact_message_sent',
                {
                  message: message,
                  sender: email
                }
              )
            }
          })
        )
        .subscribe((response) => {
          this.contactResponse = response;
          if (response === 'SUCCESS') {
            this.router.navigate(['contact-success']);
          }
        });
    }
  }

  captchaResolved(captchaToken: string): void {
    this.authenticationService
      .onceHumanLoggedIn(captchaToken)
      .subscribe((response) => {
        if (response === 'SUCCESS') {
          this.humanSessionResponse = 'SUCCESS';
          console.info('human session created');
          this.eventLogService.createAndPublishEvent(
            'human_session_created',
            {}
          );
        } else {
          this.humanSessionResponse = 'ERROR';
          console.error('error while establishing human session');
        }
      });
  }

}
