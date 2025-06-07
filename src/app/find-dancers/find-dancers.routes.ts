import { Routes } from '@angular/router';
import { FindDancersComponent } from './feature/find-dancers.component';
import { loggedInGuard } from '@shared/util/auth/logged-in.guard';

export const FIND_DANCERS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [loggedInGuard],
    component: FindDancersComponent,
  },
];
