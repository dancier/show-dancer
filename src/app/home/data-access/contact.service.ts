import { Injectable, inject } from '@angular/core';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { EnvironmentService } from '@shared/data-access/environment.service';
import {
  asError,
  asSuccess,
  OldAPIResponse,
} from '@shared/util/http/response.types';
import { EventLogService } from '@shared/data-access/log/event-log.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private environment = inject(EnvironmentService);
  private eventLogService = inject(EventLogService);

  private defaultOptions = {
    withCredentials: true,
  };

  sendMessage(
    message: string,
    sender: string
  ): Observable<OldAPIResponse<void>> {
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
