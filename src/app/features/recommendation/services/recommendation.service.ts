import { Injectable } from '@angular/core';
import { RecommendationHttpService } from './recommendation-http.service';
import { RecommendedDancer } from '../types/recommended-dancers.types';
import { map, Observable } from 'rxjs';
import { RecommendationsDto } from '../types/recommendations.dto';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  constructor(private httpService: RecommendationHttpService) {}

  getRecommendations$(): Observable<RecommendedDancer[] | null> {
    return this.httpService.getRecommendations$().pipe(
      map((response) => {
        if (response.isSuccess) {
          return this.mapDtoToRecommendedDancers(response.payload);
        } else {
          return null;
        }
      })
    );
  }

  private mapDtoToRecommendedDancers(
    dto: RecommendationsDto
  ): RecommendedDancer[] {
    return dto.map((recommendationDto) => recommendationDto.payload);
  }
}
