import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Either, makeLeft, makeRight } from '@data/types/either';
import { Event } from '@data/types/eventlog.types';
import { APIError, APISuccess } from '@data/types/shared.types';
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

  postEvent$(event: Event): Observable<Either<APIError, APISuccess>> {
    return this.http.post<void>(`${this.environment.getApiUrl()}/eventlog`, event, this.defaultOptions).pipe(
      map((_) => makeRight('SUCCESS' as APISuccess)),
      catchError((error: HttpErrorResponse): Observable<Either<APIError, APISuccess>> => {
        switch (error.status) {
          default:
            return of(makeLeft('SERVER_ERROR' as APIError));
        }
      })
    );
  }
}
