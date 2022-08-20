import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Either, asError, asSuccess } from '@data/types/either';
import { Event } from '@data/types/eventlog.types';
import { APIError } from '@data/types/shared.types';
import { catchError, map, Observable, of } from 'rxjs';
import { EnvironmentService } from '../../../environments/utils/environment.service';

@Injectable({
  providedIn: 'root',
})
export class EventLogHttpService {
  private defaultOptions = {
    withCredentials: true,
  };

  constructor(
    private environment: EnvironmentService,
    private http: HttpClient
  ) {}

  postEvent$(event: Event): Observable<Either<APIError, void>> {
    return this.http.post<void>(`${this.environment.getApiUrl()}/eventlog`, event, this.defaultOptions).pipe(
      map(response => asSuccess<void>(response)),
      catchError((error: HttpErrorResponse): Observable<Either<APIError, void>> => {
        switch (error.status) {
          default:
            return of(asError<APIError>('SERVER_ERROR'));
        }
      })
    );
  }
}
