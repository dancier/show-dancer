import { Routes } from '@angular/router';
import { RecommendationsOverviewComponent } from './pages/recommendations-overview/recommendations-overview.component';
import { loggedInGuard } from '@shared/auth/guards/logged-in.guard';

export const RECOMMENDATION_ROUTES: Routes = [
  {
    path: '',
    canActivate: [loggedInGuard],
    component: RecommendationsOverviewComponent,
  },
];
