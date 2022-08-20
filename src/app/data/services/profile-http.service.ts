import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NameAvailability, Profile } from '@data/types/profile.types';
import { APIResponse } from '@data/types/shared.types';
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

  getProfile$(): Observable<APIResponse | Profile> {
    return this.http.get<Profile>(`${this.baseUrl}`, this.defaultOptions).pipe(
      catchError((error: HttpErrorResponse): Observable<APIResponse> => {
        switch (error.status) {
          default:
            return of('SERVER_ERROR');
        }
      })
    );
  }

  updateProfile$(profile: Profile): Observable<APIResponse | Profile> {
    return this.http
      .put<Profile>(`${this.baseUrl}`, profile, this.defaultOptions)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<APIResponse> => {
          switch (error.status) {
            default:
              return of('SERVER_ERROR');
          }
        })
      );
  }

  checkNameAvailability$(dancerName: string): Observable<APIResponse> {
    return this.http
      .get<NameAvailability>(
        `${this.baseUrl}/checkDancerNameAvailibility/${dancerName}`,
        this.defaultOptions
      )
      .pipe(
        map(
          (availability): APIResponse =>
            availability ? 'SUCCESS' : 'NOT_AVAILABLE'
        ),
        catchError((error: HttpErrorResponse): Observable<APIResponse> => {
          switch (error.status) {
            default:
              return of('SERVER_ERROR');
          }
        })
      );
  }
}
