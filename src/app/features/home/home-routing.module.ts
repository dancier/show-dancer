import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '@features/home/pages/landing-page/landing-page.component';
import { LogoutPageComponent } from '@features/home/pages/logout-page/logout-page.component';
import { LoginPageComponent } from '@features/home/pages/login-page/login-page.component';
import { TermsAndConditionsComponent } from '@features/home/pages/terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from '@features/home/pages/about-us/about-us.component';
import { BetaRegistrationPageComponent } from '@features/home/pages/beta-registration-page/beta-registration-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NarrowPageComponent } from '../../layout/narrow-page/narrow-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: '',
    component: NarrowPageComponent,
    children: [
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'logout',
        component: LogoutPageComponent,
      },
      {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
      },
      {
        path: 'beta-registration',
        component: BetaRegistrationPageComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
