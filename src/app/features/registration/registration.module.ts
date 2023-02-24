import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistrationRoutingModule } from '@features/registration/registration-routing.module';
import { SharedModule } from '@shared/shared.module';
import { VerificationRequiredComponent } from './components/verification-required/verification-required.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { VerificationErrorComponent } from './components/verification-error/verification-error.component';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { SendVerificationLinkFormComponent } from './components/send-verification-link-form/send-verification-link-form.component';
import { MatIconModule } from '@angular/material/icon';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordEmailVerificationComponent } from './components/reset-password-email-verification/reset-password-email-verification.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';
import { ResendVerificationLinkComponent } from './components/resend-verification-link/resend-verification-link.component';

@NgModule({
  declarations: [
    RegisterUserFormComponent,
    VerificationRequiredComponent,
    VerifyAccountComponent,
    VerificationErrorComponent,
    SendVerificationLinkFormComponent,
    ResetPasswordComponent,
    ResetPasswordEmailVerificationComponent,
    NewPasswordComponent,
    PasswordChangedComponent,
    ResendVerificationLinkComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatIconModule,
  ],
})
export class RegistrationModule {}
