import { Routes } from '@angular/router';
import { ModernLayoutComponent } from './layout/modern-layout/modern-layout.component';
import { ExampleComponent } from '@features/example/example.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ModernLayoutComponent,
    children: [
      {
        path: 'registration',
        loadChildren: () =>
          import('@features/registration/registration.routes').then(
            (m) => m.REGISTRATION_ROUTES
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@features/profile/profile.routes').then(
            (m) => m.PROFILE_ROUTES
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('@features/chat/chat.routes').then((m) => m.CHAT_ROUTES),
      },
      {
        path: 'recommendations',
        loadChildren: () =>
          import('@features/recommendation/recommendation.routes').then(
            (m) => m.RECOMMENDATION_ROUTES
          ),
      },
      {
        path: 'example',
        component: ExampleComponent,
      },
      {
        path: '',
        loadChildren: () =>
          import('@features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      // Fallback when no prior routes are matched
      { path: '**', redirectTo: '/', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
