import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from '@features/home/home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BetaRegistrationPageComponent } from './pages/beta-registration-page/beta-registration-page.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { BetaRegistrationSuccessComponent } from './pages/beta-registration-success/beta-registration-success.component';

@NgModule({
  declarations: [
    BetaRegistrationPageComponent,
    BetaRegistrationSuccessComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexModule,
    ExtendedModule,
    MatIconModule,
    MatButtonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  exports: [],
})
export class HomeModule {}
