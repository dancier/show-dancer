import { Routes } from '@angular/router';
import { RegisterUserFormComponent } from './components/register-account/register-user-form/register-user-form.component';
import { VerificationErrorComponent } from '@features/registration/components/verify-account/verification-error/verification-error.component';
import { VerificationRequiredComponent } from '@features/registration/components/register-account/verification-required/verification-required.component';
import { VerifyAccountComponent } from '@features/registration/components/verify-account/verify-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordEmailVerificationComponent } from './components/reset-password/reset-password-email-verification/reset-password-email-verification.component';
import { NewPasswordComponent } from './components/reset-password/new-password/new-password.component';
import { PasswordChangedComponent } from './components/reset-password/new-password/password-changed/password-changed.component';
import { ResendVerificationLinkComponent } from './components/verify-account/resend-verification-link/resend-verification-link.component';
import { NarrowPageComponent } from '../../layout/narrow-page/narrow-page.component';
import { loggedOutGuard } from '@shared/auth/guards/logged-in.guard';

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
