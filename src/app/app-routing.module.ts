import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'registration',
        loadChildren: () =>
          import('@features/registration/registration.module').then(m => m.RegistrationModule)
      },
    ],
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/registration', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
