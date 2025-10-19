import { Routes } from '@angular/router';
import { ModernLayoutComponent } from '@shared/ui/layout/modern-layout/modern-layout.component';
import { loggedInGuard } from '@shared/util/auth/logged-in.guard';

export const ROUTES: Routes = [
  {
    path: '',
    component: ModernLayoutComponent,
    children: [
      {
        path: 'registration',
        loadChildren: () =>
          import('./registration/registration.routes').then(
            (m) => m.REGISTRATION_ROUTES
          ),
      },
      {
        path: 'profile',
        canActivate: [loggedInGuard],
        loadChildren: () =>
          import('./profile/profile.routes').then((m) => m.PROFILE_ROUTES),
      },
      {
        path: 'chat',
        canActivate: [loggedInGuard],
        loadChildren: () =>
          import('./chat/chat.routes').then((m) => m.CHAT_ROUTES),
      },
      {
        path: 'find-dancers',
        canActivate: [loggedInGuard],
        loadChildren: () =>
          import('./find-dancers/find-dancers.routes').then(
            (m) => m.FIND_DANCERS_ROUTES
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./home/home.routes').then((m) => m.HOME_ROUTES),
      },
      // Fallback when no prior routes are matched
      { path: '**', redirectTo: '/', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
