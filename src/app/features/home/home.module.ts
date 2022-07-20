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
import {
  BetaRegistrationSuccessComponent
} from './pages/beta-registration-success/beta-registration-success.component';
import {
  BetaSignupTypeSelectorComponent
} from './components/beta-signup-type-selector/beta-signup-type-selector.component';
import { ContributeComponent } from './pages/contribute/contribute.component';
import { BetaSignupFormComponent } from './components/beta-signup-form/beta-signup-form.component';
import {
  ContributorRegistrationSuccessComponent
} from './pages/contributor-registration-success/contributor-registration-success.component';
import { BetaSignupBannerComponent } from './components/beta-signup-banner/beta-signup-banner.component';

@NgModule({
  declarations: [
    BetaRegistrationPageComponent,
    BetaRegistrationSuccessComponent,
    BetaSignupTypeSelectorComponent,
    ContributeComponent,
    BetaSignupFormComponent,
    ContributorRegistrationSuccessComponent,
    BetaSignupBannerComponent,
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
