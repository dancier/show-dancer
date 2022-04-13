import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterUserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {}
