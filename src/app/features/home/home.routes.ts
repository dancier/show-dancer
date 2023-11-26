import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page.component';
import { LogoutPageComponent } from './pages/logout-page.component';
import { LoginPageComponent } from './pages/login-page.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions.component';
import { AboutUsComponent } from './pages/about-us.component';
import { BetaRegistrationPageComponent } from './pages/beta-registration-page.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NarrowPageComponent } from '../../layout/narrow-page/narrow-page.component';
import { loggedOutGuard } from '@shared/auth/guards/logged-in.guard';

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
    ],
  },
];
