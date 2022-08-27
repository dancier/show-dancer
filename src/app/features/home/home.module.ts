import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeRoutingModule } from '@features/home/home-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MatButtonModule } from '@angular/material/button';
import { BetaRegistrationPageComponent } from './pages/beta-registration-page/beta-registration-page.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginFormComponent,
    LoginPageComponent,
    TermsAndConditionsComponent,
    AboutUsComponent,
    BetaRegistrationPageComponent,
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
  ],
  exports: [LoginFormComponent],
})
export class HomeModule {}
