import { Routes } from '@angular/router';
import { RecommendationsComponent } from './recommendations.component';
import { loggedInGuard } from '@shared/util/auth/logged-in.guard';

export const RECOMMENDATION_ROUTES: Routes = [
  {
    path: '',
    canActivate: [loggedInGuard],
    component: RecommendationsComponent,
  },
];
