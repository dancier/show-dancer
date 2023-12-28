import { inject, Injectable } from '@angular/core';
import { RecommendationHttpService } from './recommendation-http.service';
import { RecommendedDancer } from './types/recommended-dancers.types';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { RecommendationsDto } from './types/recommendations.dto';
import { OldAPIResponse } from '@shared/util/http/response.types';
import { TimerService } from '@shared/util/time/timer.service';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  private readonly httpService = inject(RecommendationHttpService);
  private readonly timerService = inject(TimerService);

  constructor() {}

  private readonly recommendations$ = this.timerService
    .interval('fetchRecommendations', 60 * 60 * 1000) // 60 minutes
    .pipe(
      startWith(-1),
      switchMap(() =>
        this.httpService.getRecommendations$().pipe(
          map((response) => {
            if (response.isSuccess) {
              return {
                ...response,
                payload: this.mapDtoToRecommendedDancers(response.payload),
              };
            }
            return response;
          })
        )
      ),
      shareReplay(1)
    );

  getRecommendations$(): Observable<OldAPIResponse<RecommendedDancer[]>> {
    return this.recommendations$;
  }

  private mapDtoToRecommendedDancers(
    dto: RecommendationsDto
  ): RecommendedDancer[] {
    return dto.map((recommendationDto) => recommendationDto.payload);
  }
}
