import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { EnvironmentService } from '@shared/data-access/environment.service';
import { Dancer, DancerSearchFilters } from './types/dancer.types';
import {
  asError,
  asSuccess,
  OldAPIResponse,
} from '@shared/util/http/response.types';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DancersHttpService {
  private http = inject(HttpClient);
  private environment = inject(EnvironmentService);

  private readonly defaultOptions = {
    withCredentials: true,
  };

  private readonly dancersApiUrl: string;

  constructor() {
    this.dancersApiUrl = `${this.environment.getApiUrl()}/dancers`;
  }

  searchDancers$(
    filters: DancerSearchFilters
  ): Observable<OldAPIResponse<Dancer[]>> {
    let params = new HttpParams();

    if (filters.gender && filters.gender !== 'ALL') {
      params = params.set('gender', filters.gender);
    }

    if (filters.distance) {
      params = params.set('range', filters.distance.toString());
    }

    return this.http
      .get<Dancer[]>(this.dancersApiUrl, {
        ...this.defaultOptions,
        params,
      })
      .pipe(
        map(asSuccess),
        catchError((_error: HttpErrorResponse) => {
          return of(asError('SERVER_ERROR'));
        })
      );
  }
}
