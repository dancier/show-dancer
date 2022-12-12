import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModernLayoutComponent } from './layout/modern-layout/modern-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ModernLayoutComponent,
    children: [
      {
        path: 'registration',
        loadChildren: () =>
          import('@features/registration/registration.module').then(
            (m) => m.RegistrationModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('@features/chat/chat.module').then(
            (m) => m.ChatModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('@features/home/home.module').then((m) => m.HomeModule),
      },
      // Fallback when no prior routes are matched
      { path: '**', redirectTo: '/', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 0],
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
