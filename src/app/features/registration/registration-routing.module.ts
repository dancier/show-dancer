import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import {
  VerificationErrorComponent
} from '@features/registration/components/verification-error/verification-error.component';
import {
  VerificationRequiredComponent
} from '@features/registration/components/verification-required/verification-required.component';
import { VerifyAccountComponent } from '@features/registration/components/verify-account/verify-account.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterUserFormComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}
