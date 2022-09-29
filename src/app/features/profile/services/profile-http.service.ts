import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { EnvironmentService } from '@core/common/environment.service';
import { APIResponse, asError, asSuccess } from '@shared/http/response.types';
import { NameAvailability, Profile } from '../types/profile.types';

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

  getProfile$(): Observable<APIResponse<Profile>> {
    return this.http.get<Profile>(`${this.baseUrl}`, this.defaultOptions).pipe(
      map(asSuccess),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          default:
            return of(asError('SERVER_ERROR'));
        }
      })
    );
  }

  updateProfile$(profile: Profile): Observable<APIResponse<void>> {
    return this.http
      .put<void>(`${this.baseUrl}`, profile, this.defaultOptions)
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

  checkNameAvailability$(
    dancerName: string
  ): Observable<APIResponse<NameAvailability>> {
    return this.http
      .get<NameAvailability>(
        `${this.baseUrl}/checkDancerNameAvailability/${dancerName}`,
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
