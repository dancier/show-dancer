import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistrationRoutingModule } from '@features/registration/registration-routing.module';
import { SharedModule } from '@shared/shared.module';
import { VerificationRequiredComponent } from './components/verification-required/verification-required.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { VerificationErrorComponent } from './components/verification-error/verification-error.component';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
