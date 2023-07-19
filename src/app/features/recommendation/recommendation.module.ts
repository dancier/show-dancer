import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationRoutingModule } from './recommendation-routing.module';

import { RecommendationsOverviewComponent } from './pages/recommendations-overview/recommendations-overview.component';
import { RecommendedDancerComponent } from './components/recommended-dancer/recommended-dancer.component';

@NgModule({
    imports: [CommonModule, RecommendationRoutingModule, RecommendationsOverviewComponent, RecommendedDancerComponent],
})
export class RecommendationModule {}
