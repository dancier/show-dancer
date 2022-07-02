import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventLogEvent, PostEventResponse } from '@data/types/eventlog.types';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.dancerUrl}/eventlog`;

@Injectable({
  providedIn: 'root'
})
export class EventLogService {

  private defaultOptions = {
    withCredentials: true
  }

  constructor(
    private http: HttpClient,
  ) { }

  postEvent(event: EventLogEvent): Observable<PostEventResponse> {
    return this.http.post<void>(`${baseUrl}`, event, this.defaultOptions)
      .pipe(
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
