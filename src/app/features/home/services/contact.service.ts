import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { EnvironmentService } from '@core/common/environment.service';
import { APIResponse, asError, asSuccess } from '@shared/http/response.types';
import { EventLogService } from '@core/logging/event-log.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private defaultOptions = {
    withCredentials: true,
  };

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService,
    private eventLogService: EventLogService
  ) {}

  sendMessage(message: string, sender: string): Observable<APIResponse<void>> {
    const apiUrlContact = `${this.environment.getApiUrl()}/contacts`;
    const payload = {
      sender,
      message,
    };

    return this.http
      .post<void>(`${apiUrlContact}`, payload, this.defaultOptions)
      .pipe(
        map(asSuccess),
        tap((_) => {
          this.eventLogService.createAndPublishEvent(
            'human_session_created',
            {}
          );
        }),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case HttpStatusCode.Unauthorized:
              return of(asError('NOT_A_HUMAN'));
            default:
              return of(asError('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }
}
