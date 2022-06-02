import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeRoutingModule } from '@features/home/home-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginFormComponent,
    LoginPageComponent,
    TermsAndConditionsComponent,
    AboutUsComponent,
    ProfilePageComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        FlexModule,
        MatIconModule,
        ExtendedModule,
        MatButtonModule,
        MatTabsModule,
    ]
})
export class HomeModule { }
