import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event, PostEventResponse } from '@data/types/eventlog.types';
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

  postEvent$(event: Event): Observable<PostEventResponse> {
    return this.http.post<void>(`${this.environment.getApiUrl()}/eventlog`, event, this.defaultOptions).pipe(
      map((_): PostEventResponse => 'SUCCESS'),
      catchError((error: HttpErrorResponse): Observable<PostEventResponse> => {
        switch (error.status) {
          default:
            return of('SERVER_ERROR');
        }
      })
    );
  }
}
