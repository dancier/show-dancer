import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BetaRegistrationPageComponent
} from '@features/home/pages/beta-registration-page/beta-registration-page.component';
import {
  BetaRegistrationSuccessComponent
} from './pages/beta-registration-success/beta-registration-success.component';
import { AboutUsComponent } from '@features/home/pages/about-us/about-us.component';
import { ContributeComponent } from '@features/home/pages/contribute/contribute.component';
import {
  ContributorRegistrationSuccessComponent
} from '@features/home/pages/contributor-registration-success/contributor-registration-success.component';
import { ContactComponent } from '@features/home/pages/contact/contact.component';
import { ContactSuccessComponent } from '@features/home/pages/contact-success/contact-success.component';
import { ImprintComponent } from '@features/home/pages/imprint/imprint.component';

export const routes: Routes = [
  {
    path: '',
    component: BetaRegistrationPageComponent
  },
  {
    path: 'beta-registration-success',
    component: BetaRegistrationSuccessComponent
  },
  {
    path: 'contributor-registration-success',
    component: ContributorRegistrationSuccessComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'contribute',
    component: ContributeComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'contact-success',
    component: ContactSuccessComponent,
  },
  {
    path: 'imprint',
    component: ImprintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
