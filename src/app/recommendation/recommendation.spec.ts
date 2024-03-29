/** Integration Tests for Recommendation Feature */
import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator/jest';
import { RecommendationsComponent } from './recommendations.component';
import { Location } from '@angular/common';
import { RecommendedDancerComponent } from './ui/recommended-dancer.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RecommendationService } from './data-access/recommendation.service';
import { RecommendationHttpService } from './data-access/recommendation-http.service';

import recommendationsJson from './util/fixtures/recommendations.json';
import { MockProvider } from 'ng-mocks';
import { TimerService } from '@shared/util/time/timer.service';
import { of } from 'rxjs';

describe('Recommendation Feature', () => {
  describe('when the user is on the recommendation page', () => {
    let spectator: SpectatorRouting<RecommendationsComponent>;
    const createComponent = createRoutingFactory({
      component: RecommendationsComponent,
      imports: [RecommendedDancerComponent, HttpClientTestingModule],
      providers: [
        RecommendationService,
        RecommendationHttpService,
        MockProvider(TimerService, {
          interval: () => of(0),
        }),
      ],
      stubsEnabled: false,
      routes: [
        {
          path: '',
          component: RecommendationsComponent,
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

    it('shows a list of 4 recommendations', () => {
      expect(spectator.queryAll('app-recommended-dancer')).toHaveLength(4);
    });
  });
});
