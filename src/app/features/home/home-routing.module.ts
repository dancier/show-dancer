import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BetaRegistrationPageComponent
} from '@features/home/pages/beta-registration-page/beta-registration-page.component';
import { BetaRegistrationSuccessComponent } from './pages/beta-registration-success/beta-registration-success.component';
import { AboutUsComponent } from '@features/home/pages/about-us/about-us.component';

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
    path: 'about-us',
    component: AboutUsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
