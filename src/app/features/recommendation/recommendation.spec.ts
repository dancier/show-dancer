/** Integration Tests for Recommendation Feature */
import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';
import { RecommendationsOverviewComponent } from './pages/recommendations-overview/recommendations-overview.component';
import { Location } from '@angular/common';
import { RecommendedDancerComponent } from './components/recommended-dancer/recommended-dancer.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RecommendationService } from './services/recommendation.service';
import { RecommendationHttpService } from './services/recommendation-http.service';

import recommendationsJson from './fixtures/recommendations.json';

describe('Recommendation Feature', () => {
  describe('when the user is on the recommendation page', () => {
    let spectator: SpectatorRouting<RecommendationsOverviewComponent>;
    const createComponent = createRoutingFactory({
      component: RecommendationsOverviewComponent,
      imports: [RecommendedDancerComponent, HttpClientTestingModule],
      providers: [RecommendationService, RecommendationHttpService],
      stubsEnabled: false,
      routes: [
        {
          path: '',
          component: RecommendationsOverviewComponent,
        },
      ],
    });

    beforeEach(async () => {
      spectator = createComponent();
      await spectator.fixture.whenStable();
      expect(spectator.inject(Location).path()).toBe('/');

      mockBackendResponses();
      spectator.detectChanges();

      function mockBackendResponses(): void {
        const httpMock = spectator.inject(HttpTestingController);
        const requests = httpMock.match(() => true);
        requests.forEach((request) => {
          if (!request.cancelled) {
            request.flush(recommendationsJson);
          }
        });
      }
    });

    it('shows a list of 4 recommendations', async () => {
      expect(spectator.queryAll('app-recommended-dancer')).toHaveLength(4);
    });
  });
});
