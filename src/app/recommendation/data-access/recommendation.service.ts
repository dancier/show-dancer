import { Injectable } from '@angular/core';
import { RecommendationHttpService } from './recommendation-http.service';
import { RecommendedDancer } from './types/recommended-dancers.types';
import { map, Observable, shareReplay } from 'rxjs';
import { RecommendationsDto } from './types/recommendations.dto';
import { OldAPIResponse } from '@shared/util/http/response.types';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  constructor(private httpService: RecommendationHttpService) {}

  private readonly recommendations$ = this.httpService
    .getRecommendations$()
    .pipe(
      map((response) => {
        if (response.isSuccess) {
          return {
            ...response,
            payload: this.mapDtoToRecommendedDancers(response.payload),
          };
        }
        return response;
      }),
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
