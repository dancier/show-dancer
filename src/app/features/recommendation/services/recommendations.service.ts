import { Injectable } from '@angular/core';
import { RecommendationsHttpService } from './recommendations-http.service';
import { RecommendedDancer } from '../types/recommended-dancers.types';
import { map, Observable } from 'rxjs';
import { RecommendationsDto } from '../types/recommendations.dto';

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  constructor(private httpService: RecommendationsHttpService) {}

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
