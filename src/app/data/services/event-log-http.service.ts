import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '@data/types/eventlog.types';
import { APIResponseWithoutPayload, asError, asSuccess } from '@data/types/response.types';
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

  postEvent$(event: Event): Observable<APIResponseWithoutPayload> {
    return this.http.post(`${this.environment.getApiUrl()}/eventlog`, event, this.defaultOptions).pipe(
      map(asSuccess),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          default:
            return of(asError('SERVER_ERROR'));
        }
      })
    );
  }
}
