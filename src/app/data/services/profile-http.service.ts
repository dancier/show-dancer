import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NameAvailability, Profile } from '@data/types/profile.types';
import {
  APIResponseWithoutPayload,
  APIResponseWithPayload,
  asError,
  asSuccess,
  asSuccessWithPayload,
} from '@data/types/response.types';
import { catchError, map, Observable, of } from 'rxjs';
import { EnvironmentService } from '../../../environments/utils/environment.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  private defaultOptions = {
    withCredentials: true,
  };
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.baseUrl = `${this.environment.getApiUrl()}/profile`;
  }

  getProfile$(): Observable<APIResponseWithPayload<Profile>> {
    return this.http.get<Profile>(`${this.baseUrl}`, this.defaultOptions).pipe(
      map(asSuccessWithPayload),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          default:
            return of(asError('SERVER_ERROR'));
        }
      })
    );
  }

  updateProfile$(profile: Profile): Observable<APIResponseWithoutPayload> {
    return this.http
      .put<Profile>(`${this.baseUrl}`, profile, this.defaultOptions)
      .pipe(
        map((_) => asSuccess()),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }

  checkNameAvailability$(
    dancerName: string
  ): Observable<APIResponseWithPayload<NameAvailability>> {
    return this.http
      .get<NameAvailability>(
        `${this.baseUrl}/checkDancerNameAvailibility/${dancerName}`,
        this.defaultOptions
      )
      .pipe(
        map((availability) => asSuccessWithPayload(availability)),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }
}
