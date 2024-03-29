import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './eventlog.types';
import { catchError, map, Observable, of } from 'rxjs';
import { EnvironmentService } from '../environment.service';
import {
  asError,
  asSuccess,
  OldAPIResponse,
} from '../../util/http/response.types';

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

  postEvent$(event: Event): Observable<OldAPIResponse<void>> {
    return this.http
      .post<void>(
        `${this.environment.getApiUrl()}/eventlog`,
        event,
        this.defaultOptions
      )
      .pipe(
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
