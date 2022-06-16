import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '@features/home/pages/landing-page/landing-page.component';
import { LoginPageComponent } from '@features/home/pages/login-page/login-page.component';
import { TermsAndConditionsComponent } from '@features/home/pages/terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from '@features/home/pages/about-us/about-us.component';
import { ProfilePageComponent } from '@features/home/pages/profile-page/profile-page.component';
import { EnterUserNameComponent } from '@features/home/pages/enter-user-name/enter-user-name.component';
import { EditPersonalDataComponent } from '@features/home/pages/edit-personal-data/edit-personal-data.component';
import { LoggedInGuard } from '@core/guards/logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'mail-verified',
    component: EnterUserNameComponent
  },
  {
    path: 'edit-personal-data',
    component: EditPersonalDataComponent,
    canActivate: [LoggedInGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
