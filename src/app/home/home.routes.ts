import { Routes } from '@angular/router';
import { LandingPageComponent } from './feature/landing-page.component';
import { LogoutPageComponent } from './feature/logout-page.component';
import { LoginPageComponent } from './feature/login-page.component';
import { TermsAndConditionsComponent } from './feature/terms-and-conditions.component';
import { AboutUsComponent } from './feature/about-us.component';
import { BetaRegistrationPageComponent } from './feature/beta-registration-page.component';
import { ContactComponent } from './feature/contact.component';
import { NarrowPageComponent } from '@shared/ui/layout/narrow-page/narrow-page.component';
import { loggedOutGuard } from '@shared/util/auth/logged-in.guard';
import { ImprintComponent } from './feature/imprint.component';

export const HOME_ROUTES: Routes = [
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
        canActivate: [loggedOutGuard],
        component: LoginPageComponent,
      },
      {
        path: 'imprint',
        component: ImprintComponent,
      },
    ],
  },
];
