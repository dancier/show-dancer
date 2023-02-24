import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeRoutingModule } from '@features/home/home-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { BetaRegistrationPageComponent } from './pages/beta-registration-page/beta-registration-page.component';
import { SharedModule } from '@shared/shared.module';
import { ContactComponent } from './pages/contact/contact.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginFormComponent,
    LoginPageComponent,
    TermsAndConditionsComponent,
    AboutUsComponent,
    BetaRegistrationPageComponent,
    ContactComponent,
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
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  exports: [LoginFormComponent],
})
export class HomeModule {}
