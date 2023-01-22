/** Integration Tests for Recommendation Feature */
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { RecommendationsOverviewComponent } from './pages/recommendations-overview/recommendations-overview.component';
import { Location } from '@angular/common';
import { RecommendedDancerComponent } from './components/recommended-dancer/recommended-dancer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Recommendation Feature', () => {
  describe('when the user is on the recommendation page', () => {
    const createComponent = createRoutingFactory({
      component: RecommendationsOverviewComponent,
      declarations: [RecommendedDancerComponent],
      imports: [HttpClientTestingModule],
      stubsEnabled: false,
      routes: [
        {
          path: '',
          component: RecommendationsOverviewComponent,
        },
      ],
    });

    it('shows a list of recommendations', async () => {
      const spectator = createComponent();
      await spectator.fixture.whenStable();
      expect(spectator.inject(Location).path()).toBe('/');

      // TODO: Jetzt Test richtig schreiben
    });
  });
});
