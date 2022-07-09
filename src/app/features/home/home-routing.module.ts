import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BetaRegistrationPageComponent
} from '@features/home/pages/beta-registration-page/beta-registration-page.component';

export const routes: Routes = [
  {
    path: '',
    component: BetaRegistrationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
