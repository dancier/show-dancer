import { Component } from '@angular/core';
import { RecommendationService } from '../../services/recommendation.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { RecommendedDancerComponent } from '../../components/recommended-dancer/recommended-dancer.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-recommendations-overview',
    templateUrl: './recommendations-overview.component.html',
    styleUrls: ['./recommendations-overview.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        RecommendedDancerComponent,
        AlertComponent,
        AsyncPipe,
    ],
})
export class RecommendationsOverviewComponent {
  recommendationsResponse$ = this.recommendationsService.getRecommendations$();

  constructor(public recommendationsService: RecommendationService) {}
}
