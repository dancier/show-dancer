import { Routes } from '@angular/router';
import { RecommendationsOverviewComponent } from './pages/recommendations-overview/recommendations-overview.component';

export const RECOMMENDATION_ROUTES: Routes = [
  {
    path: '',
    component: RecommendationsOverviewComponent,
  },
];
