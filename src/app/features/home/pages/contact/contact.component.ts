import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { EventLogService } from '@core/logging/event-log.service';
import { ContactService } from '../../services/contact.service';
import { tap } from 'rxjs';
import { APIResponse } from '@shared/http/response.types';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  contactResponse?: APIResponse<void>;

  // TODO: refactor, we should solve this in a reactive way (e.g. subscribe in the template)
  isCaptchaSolved = false;
  captchaError = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private contactService: ContactService,
    public authStorageService: AuthStorageService,
    private authenticationService: AuthenticationService,
    private eventLogService: EventLogService
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      const { message, email } = this.contactForm.value;

      this.contactService
        .sendMessage(message, email)
        .pipe(
          tap((response) => {
            if (response.isSuccess) {
              this.eventLogService.createAndPublishEvent(
                'contact_message_sent',
                {
                  message: message,
                  sender: email,
                }
              );
            }
          })
        )
        .subscribe((response) => {
          this.contactResponse = response;
          if (response.isSuccess) {
            // TODO: don't navigate, just show success message in the same page
            // this.router.navigate(['contact-success']);
          }
        });
    }
  }

  captchaResolved(captchaToken: string): void {
    this.authenticationService
      .loginAsHuman(captchaToken)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.isCaptchaSolved = true;
        } else {
          this.captchaError = true;
        }
      });
  }

  private initReactiveForm(): void {
    this.contactForm = this.fb.group({
      message: ['', [Validators.required]],
      email: ['', [Validators.email]],
    });
  }
}
