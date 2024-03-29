import { Routes } from '@angular/router';
import { NarrowPageComponent } from '@shared/ui/layout/narrow-page/narrow-page.component';
import { loggedOutGuard } from '@shared/util/auth/logged-in.guard';
import { RegisterUserFormComponent } from './feature/register-account/register-user-form/register-user-form.component';
import { ResetPasswordComponent } from './feature/reset-password/reset-password.component';
import { PasswordChangedComponent } from './feature/reset-password/password-changed/password-changed.component';
import { NewPasswordComponent } from './feature/reset-password/new-password/new-password.component';
import { ResetPasswordEmailVerificationComponent } from './feature/reset-password/reset-password-email-verification/reset-password-email-verification.component';
import { VerificationRequiredComponent } from './feature/register-account/verification-required/verification-required.component';
import { VerifyAccountComponent } from './feature/verify-account/verify-account.component';
import { VerificationErrorComponent } from './feature/verify-account/verification-error/verification-error.component';
import { ResendVerificationLinkComponent } from './feature/verify-account/resend-verification-link/resend-verification-link.component';

export const REGISTRATION_ROUTES: Routes = [
  {
    path: '',
    component: NarrowPageComponent,
    children: [
      {
        path: '',
        canActivate: [loggedOutGuard],
        component: RegisterUserFormComponent,
      },
      {
        path: 'reset-password',
        canActivate: [loggedOutGuard],
        component: ResetPasswordComponent,
      },
      {
        path: 'reset-password-success',
        component: PasswordChangedComponent,
      },
      {
        path: 'reset-password/:code',
        canActivate: [loggedOutGuard],
        component: NewPasswordComponent,
      },
      {
        path: 'reset-password-verification',
        canActivate: [loggedOutGuard],
        component: ResetPasswordEmailVerificationComponent,
      },
      {
        path: 'verify-account',
        canActivate: [loggedOutGuard],
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
    ],
  },
];
