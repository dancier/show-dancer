import { Component } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';

@Component({
  selector: 'app-recommendations-overview',
  templateUrl: './recommendations-overview.component.html',
  styleUrls: ['./recommendations-overview.component.scss'],
})
export class RecommendationsOverviewComponent {
  recommendationsResponse$ = this.recommendationsService.getRecommendations$();

  constructor(public recommendationsService: RecommendationService) {}
}
