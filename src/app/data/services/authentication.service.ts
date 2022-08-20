import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  LoginRequest,
  UserRegistration,
} from '@data/types/authentication.types';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { AuthStorageService } from '@data/services/auth-storage.service';
import { APIError, APISuccess } from '@data/types/shared.types';
import { EnvironmentService } from '../../../environments/utils/environment.service';
import { Either, makeLeft, makeRight } from '@data/types/either';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private defaultOptions = {
    withCredentials: true
  };

  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
    private environment: EnvironmentService
  ) {
    this.baseUrl = `${this.environment.getApiUrl()}/authentication`;
  }

  onceUserRegistered(userRegistration: UserRegistration): Observable<Either<APIError, APISuccess>> {
    return this.http.post<void>(`${this.baseUrl}/registrations`, userRegistration, this.defaultOptions)
      .pipe(
        map((_) => makeRight('SUCCESS' as APISuccess)),
        catchError((error: HttpErrorResponse): Observable<Either<APIError, APISuccess>> => {
          switch (error.status) {
            case 409:
              return of(makeLeft('EMAIL_ALREADY_IN_USE' as APIError));
            default:
              return of(makeLeft('SERVER_ERROR' as APIError));
          }
        }),
        shareReplay(1)
      );
  }

  onceUserLoggedIn(loginRequest: LoginRequest): Observable<Either<APIError, APISuccess>>  {
    return this.http.post<void>(`${this.baseUrl}/login`, loginRequest , this.defaultOptions)
      .pipe(
        map((_): Either<APIError, APISuccess> => makeRight('SUCCESS')),
        tap(_ => this.authStorageService.setLoginState(true)),
        catchError((error: HttpErrorResponse): Observable<Either<APIError, APISuccess>> => {
          switch(error.status) {
            case 401:
              return of(makeLeft('INCORRECT_CREDENTIALS' as APIError));
            case 403:
              return of(makeLeft('EMAIL_NOT_VALIDATED' as APIError));
            default:
              return of(makeLeft('SERVER_ERROR' as APIError));
          }
        }),
        shareReplay(1)
      );
  }

  onceHumanLoggedIn(captchaToken: string): Observable<Either<APIError, APISuccess>>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Captcha-Token': captchaToken,
      }),
      ...this.defaultOptions,
    };

    return this.http.post<void>(`${this.baseUrl}/loginAsHuman`, null, httpOptions)
      .pipe(
        map((_) => makeRight('SUCCESS' as APISuccess)),
        tap(_ => this.authStorageService.setHumanState(true)),
        catchError((error: HttpErrorResponse): Observable<Either<APIError, APISuccess>> => {
          switch(error.status) {
            case 401:
              return of(makeLeft('INCORRECT_CREDENTIALS' as APIError));
            default:
              return of(makeLeft('SERVER_ERROR' as APIError));
          }
        }),
        shareReplay(1)
      );
  }

  onceAccountVerified(validationCode: string): Observable<Either<APIError, APISuccess>> {
    return this.http.put<void>(`${this.baseUrl}/email-validations/${validationCode}`, null, this.defaultOptions)
      .pipe(
        map((_) => makeRight('SUCCESS' as APISuccess)),
        tap(_ => this.authStorageService.setLoginState(true)),
        catchError((error: HttpErrorResponse): Observable<Either<APIError, APISuccess>>  => {
          switch (error.status) {
            case 400:
              return of(makeLeft('VALIDATION_ERROR' as APIError));
              default:
                return of(makeLeft('SERVER_ERROR' as APIError));
          }
        }),
        shareReplay(1)
      );
  }

  onceUserLoggedOut(): Observable<Either<APIError, APISuccess>> {
    return this.http.get<void>(`${this.baseUrl}/logout`, this.defaultOptions)
    .pipe(
      map((_) => makeRight('SUCCESS' as APISuccess)),
      tap(_ => this.authStorageService.setLoginState(false)),
      catchError((error: HttpErrorResponse): Observable<Either<APIError, APISuccess>> => {
        switch (error.status) {
          default:
            return of(makeLeft('SERVER_ERROR' as APIError));
        }
      })
    );
  }
}
