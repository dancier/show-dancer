import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EnvironmentService } from '@shared/data-access/environment.service';
import { RecommendationsDto } from './types/recommendations.dto';
import {
  asError,
  asSuccess,
  OldAPIResponse,
} from '@shared/util/http/response.types';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecommendationHttpService {
  private readonly defaultOptions = {
    withCredentials: true,
  };

  private readonly recommendationsApiUrl: string;

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    // for local testing with mock-server
    // this.recommendationsApiUrl = `http://localhost:3000/recommendations`;
    this.recommendationsApiUrl = `${this.environment.getApiUrl()}/recommendations`;
  }

  getRecommendations$(): Observable<OldAPIResponse<RecommendationsDto>> {
    return this.http
      .get<RecommendationsDto>(this.recommendationsApiUrl, this.defaultOptions)
      .pipe(
        map(asSuccess),
        catchError((_error: HttpErrorResponse) => {
          return of(asError('SERVER_ERROR'));
        })
      );
  }
}
