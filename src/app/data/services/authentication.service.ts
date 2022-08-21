import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { asLoginError, LoginRequest, LoginResponse, UserRegistration, } from '@data/types/authentication.types';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { AuthStorageService } from '@data/services/auth-storage.service';
import { APIError } from '@data/types/shared.types';
import { EnvironmentService } from '../../../environments/utils/environment.service';
import { asError, asSuccess, Either } from '@data/types/either';

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

  onceUserRegistered(userRegistration: UserRegistration): Observable<Either<APIError, void>> {
    return this.http.post<void>(`${this.baseUrl}/registrations`, userRegistration, this.defaultOptions)
      .pipe(
        map((response) => asSuccess(response)),
        catchError((error: HttpErrorResponse): Observable<Either<APIError, void>> => {
          switch (error.status) {
            case 409:
              return of(asError<APIError>('EMAIL_ALREADY_IN_USE'));
            default:
              return of(asError<APIError>('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  onceUserLoggedIn(loginRequest: LoginRequest): Observable<LoginResponse>  {
    return this.http.post<void>(`${this.baseUrl}/login`, loginRequest , this.defaultOptions)
      .pipe(
        map((response): LoginResponse => ({
          isSuccess: true,
        })),
        tap(_ => this.authStorageService.setLoginState(true)),
        catchError((error: HttpErrorResponse) => {
          switch(error.status) {
            case 401:
              return of(asLoginError('INCORRECT_CREDENTIALS'));
            case 403:
              return of(asLoginError('EMAIL_NOT_VALIDATED'));
            default:
              return of(asLoginError('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  onceHumanLoggedIn(captchaToken: string): Observable<Either<APIError, void>>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Captcha-Token': captchaToken,
      }),
      ...this.defaultOptions,
    };

    return this.http.post<void>(`${this.baseUrl}/loginAsHuman`, null, httpOptions)
      .pipe(
        map((response) => asSuccess(response)),
        tap(_ => this.authStorageService.setHumanState(true)),
        catchError((error: HttpErrorResponse): Observable<Either<APIError, void>> => {
          switch(error.status) {
            case 401:
              return of(asError<APIError>('INCORRECT_CREDENTIALS'));
            default:
              return of(asError<APIError>('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  onceAccountVerified(validationCode: string): Observable<Either<APIError, void>> {
    return this.http.put<void>(`${this.baseUrl}/email-validations/${validationCode}`, null, this.defaultOptions)
      .pipe(
        map(response => asSuccess(response)),
        tap(_ => this.authStorageService.setLoginState(true)),
        catchError((error: HttpErrorResponse): Observable<Either<APIError, void>>  => {
          switch (error.status) {
            case 400:
              return of(asError<APIError>('VALIDATION_ERROR'));
              default:
                return of(asError(<APIError>'SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  onceUserLoggedOut(): Observable<Either<APIError, void>> {
    return this.http.get<void>(`${this.baseUrl}/logout`, this.defaultOptions)
    .pipe(
      map(response => asSuccess(response)),
      tap(_ => this.authStorageService.setLoginState(false)),
      catchError((error: HttpErrorResponse): Observable<Either<APIError, void>> => {
        switch (error.status) {
          default:
            return of(asError<APIError>('SERVER_ERROR'));
        }
      })
    );
  }
}
