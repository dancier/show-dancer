import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@shared/data-access/auth/auth.service';
import { AuthHttpService } from '@shared/data-access/auth/auth-http.service';
import { EventLogService } from '@shared/data-access/log/event-log.service';
import { ContactService } from '../data-access/contact.service';
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
  template: `
    <div data-test="page-contact">
      <ng-container
        *ngIf="!contactResponse || !contactResponse.isSuccess; else success"
      >
        <h1 class="page-header">Kontaktiere uns</h1>
        <p>
          Du kannst das untenstehende Textfeld nutzen, um uns Wünsche,
          Anregungen, Fragen und mehr zukommen zu lassen.
        </p>
        <p>Wir freuen uns auf deine Nachricht.</p>

        <form novalidate [formGroup]="contactForm" (ngSubmit)="submitForm()">
          <mat-card-content class="card-content-container flex flex-col">
            <ng-container *ngIf="authService.authData$ | async as authData">
              <mat-form-field appearance="fill" class="full-width">
                <mat-label>E-Mail</mat-label>
                <input
                  formControlName="email"
                  matInput
                  placeholder="(Deine Mail-Adresse)"
                  type="email"
                />
              </mat-form-field>

              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Schreibe uns deine Nachricht</mat-label>
                <textarea
                  formControlName="message"
                  matInput
                  rows="10"
                ></textarea>
              </mat-form-field>

              <ng-container *ngIf="!authData.isHuman || isCaptchaSolved">
                <div class="mb-4">
                  <re-captcha
                    siteKey="6LetqBAgAAAAAJXA5K_U88bsxKtyp_vld6J0x-Nv"
                    (resolved)="captchaResolved($event)"
                  ></re-captcha>
                </div>
              </ng-container>
              <mat-error *ngIf="captchaError">
                Es ist ein Fehler aufgetreten, bitte versuche es später erneut.
              </mat-error>
              <mat-error *ngIf="contactResponse && !contactResponse.isSuccess">
                <span>
                  {{ contactResponse.error | errorMessage }}
                </span>
              </mat-error>

              <button
                class="mb-4"
                color="primary"
                mat-raised-button
                [disabled]="!contactForm.valid || !authData.isHuman"
              >
                Nachricht senden
              </button>
            </ng-container>
          </mat-card-content>
        </form>
      </ng-container>

      <ng-template #success>
        <h1 class="page-header">Vielen Dank!</h1>
        <p>
          Wir haben deine Nachricht erhalten und werden uns schnellstmöglich bei
          dir melden.
        </p>
      </ng-template>
    </div>
  `,
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
  private fb = inject(NonNullableFormBuilder);
  private contactService = inject(ContactService);
  public authService = inject(AuthService);
  private authHttpService = inject(AuthHttpService);
  private eventLogService = inject(EventLogService);

  // TODO: hier weiter
  //public shouldShowCaptcha = this.authService.authData$.pipe();

  contactForm!: FormGroup;
  contactResponse?: OldAPIResponse<void>;

  // TODO: refactor, we should solve this in a reactive way (e.g. subscribe in the template)
  isCaptchaSolved = false;
  captchaError = false;

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
    this.authHttpService.loginAsHuman(captchaToken).subscribe((response) => {
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
