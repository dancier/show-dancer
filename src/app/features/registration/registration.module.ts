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
import {
  VerificationSuccessfulComponent
} from './components/verification-successful/verification-successful.component';
import { VerificationErrorComponent } from './components/verification-error/verification-error.component';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    RegisterUserFormComponent,
    VerificationRequiredComponent,
    VerifyAccountComponent,
    VerificationSuccessfulComponent,
    VerificationErrorComponent
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
    ]
})
export class RegistrationModule { }
