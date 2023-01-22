import { Component } from '@angular/core';
import { RecommendationsService } from '../../services/recommendations.service';

@Component({
  selector: 'app-recommendations-overview',
  templateUrl: './recommendations-overview.component.html',
  styleUrls: ['./recommendations-overview.component.scss'],
})
export class RecommendationsOverviewComponent {
  constructor(public recommendationsService: RecommendationsService) {}
}
