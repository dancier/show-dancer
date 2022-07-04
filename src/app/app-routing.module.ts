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
      {
        path: 'profile',
        loadChildren: () =>
          import('@features/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: '',
        loadChildren: () =>
          import('@features/home/home.module').then(m => m.HomeModule)
      },
      // Fallback when no prior routes are matched
      { path: '**', redirectTo: '/', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
