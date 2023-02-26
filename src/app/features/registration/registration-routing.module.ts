import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { VerificationErrorComponent } from '@features/registration/components/verification-error/verification-error.component';
import { VerificationRequiredComponent } from '@features/registration/components/verification-required/verification-required.component';
import { VerifyAccountComponent } from '@features/registration/components/verify-account/verify-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordEmailVerificationComponent } from './components/reset-password-email-verification/reset-password-email-verification.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { PasswordChangedComponent } from './components/password-changed/password-changed.component';
import { ResendVerificationLinkComponent } from './components/resend-verification-link/resend-verification-link.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterUserFormComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'reset-password-success',
    component: PasswordChangedComponent,
  },
  {
    path: 'reset-password/:code',
    component: NewPasswordComponent,
  },
  {
    path: 'reset-password-verification',
    component: ResetPasswordEmailVerificationComponent,
  },
  {
    path: 'verify-account',
    component: VerificationRequiredComponent,
  },
  {
    path: 'verify-account/:code',
    component: VerifyAccountComponent,
  },
  {
    path: 'verify/error',
    component: VerificationErrorComponent,
  },
  {
    path: 'resend-verification-link',
    component: ResendVerificationLinkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
