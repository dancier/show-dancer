import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Either, makeLeft, makeRight } from '@data/types/either';
import { NameAvailability, Profile } from '@data/types/profile.types';
import { APIError, APISuccess } from '@data/types/shared.types';
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
      map((profile) => makeRight(profile)),
      catchError(
        (error: HttpErrorResponse): Observable<Either<APIError, Profile>> => {
          switch (error.status) {
            default:
              return of(makeLeft('SERVER_ERROR' as APIError));
          }
        }
      )
    );
  }

  updateProfile$(profile: Profile): Observable<Either<APIError, APISuccess>> {
    return this.http
      .put<Profile>(`${this.baseUrl}`, profile, this.defaultOptions)
      .pipe(
        map((_) => makeRight('SUCCESS' as APISuccess)),
        catchError(
          (
            error: HttpErrorResponse
          ): Observable<Either<APIError, APISuccess>> => {
            switch (error.status) {
              default:
                return of(makeLeft('SERVER_ERROR' as APIError));
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
        map((availability) => makeRight(availability.isAvailable)),
        catchError(
          (error: HttpErrorResponse): Observable<Either<APIError, boolean>> => {
            switch (error.status) {
              default:
                return of(makeLeft('SERVER_ERROR' as APIError));
            }
          }
        )
      );
  }
}
