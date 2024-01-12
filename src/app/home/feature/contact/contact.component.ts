import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@shared/data-access/auth/auth.service';
import { AuthHttpService } from '@shared/data-access/auth/auth-http.service';
import { EventLogService } from '@shared/data-access/log/event-log.service';
import { ContactService } from '../../data-access/contact.service';
import { tap } from 'rxjs';
import { OldAPIResponse } from '@shared/util/http/response.types';
import { ErrorMessagePipe } from '@shared/util/http/error-message.pipe';
import { MatButtonModule } from '@angular/material/button';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgIf } from '@angular/common';
import { DataTestDirective } from '@shared/util/data-test.directive';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    DataTestDirective,
    NgIf,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RecaptchaModule,
    MatButtonModule,
    AsyncPipe,
    ErrorMessagePipe,
  ],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  contactResponse?: OldAPIResponse<void>;

  // TODO: refactor, we should solve this in a reactive way (e.g. subscribe in the template)
  isCaptchaSolved = false;
  captchaError = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private contactService: ContactService,
    public authStorageService: AuthService,
    private authenticationService: AuthHttpService,
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
