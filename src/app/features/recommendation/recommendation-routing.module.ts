import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendationsOverviewComponent } from './pages/recommendations-overview/recommendations-overview.component';

export const routes: Routes = [
  {
    path: '',
    component: RecommendationsOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendationRoutingModule {}
