import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Either, asError, asSuccess } from '@data/types/either';
import { NameAvailability, Profile } from '@data/types/profile.types';
import { APIError } from '@data/types/shared.types';
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

  getProfile$(): Observable<Either<APIError, Profile>> {
    return this.http.get<Profile>(`${this.baseUrl}`, this.defaultOptions).pipe(
      map((profile) => asSuccess(profile)),
      catchError(
        (error: HttpErrorResponse): Observable<Either<APIError, Profile>> => {
          switch (error.status) {
            default:
              return of(asError<APIError>('SERVER_ERROR'));
          }
        }
      )
    );
  }

  updateProfile$(profile: Profile): Observable<Either<APIError, Profile>> {
    return this.http
      .put<Profile>(`${this.baseUrl}`, profile, this.defaultOptions)
      .pipe(
        map((profile) => asSuccess<Profile>(profile)),
        catchError(
          (
            error: HttpErrorResponse
          ): Observable<Either<APIError, Profile>> => {
            switch (error.status) {
              default:
                return of(asError<APIError>('SERVER_ERROR'));
            }
          }
        )
      );
  }

  checkNameAvailability$(
    dancerName: string
  ): Observable<Either<APIError, boolean>> {
    return this.http
      .get<NameAvailability>(
        `${this.baseUrl}/checkDancerNameAvailibility/${dancerName}`,
        this.defaultOptions
      )
      .pipe(
        map((availability) => asSuccess(availability.isAvailable)),
        catchError(
          (error: HttpErrorResponse): Observable<Either<APIError, boolean>> => {
            switch (error.status) {
              default:
                return of(asError('SERVER_ERROR' as APIError));
            }
          }
        )
      );
  }
}
