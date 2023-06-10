import { Injectable } from '@angular/core';
import { RecommendationHttpService } from './recommendation-http.service';
import { RecommendedDancer } from '../types/recommended-dancers.types';
import { map, Observable, shareReplay } from 'rxjs';
import { RecommendationsDto } from '../types/recommendations.dto';
import { APIResponse } from '@shared/http/response.types';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  constructor(private httpService: RecommendationHttpService) {}

  getRecommendations$(): Observable<APIResponse<RecommendedDancer[]>> {
    return this.httpService.getRecommendations$().pipe(
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
  }

  private mapDtoToRecommendedDancers(
    dto: RecommendationsDto
  ): RecommendedDancer[] {
    return dto.map((recommendationDto) => recommendationDto.payload);
  }
}
