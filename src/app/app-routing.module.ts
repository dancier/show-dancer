import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'registration',
        loadChildren: () =>
          import('@features/registration/registration.module').then(m => m.RegistrationModule)
      },
      // Fallback when no prior routes is matched
      { path: '**', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
