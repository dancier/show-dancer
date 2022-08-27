import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginRequest, UserRegistration, } from '@data/types/authentication.types';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { AuthStorageService } from '@data/services/auth-storage.service';
import { EnvironmentService } from '../../../environments/utils/environment.service';
import { APIResponseWithoutPayload, asError, asSuccess } from '@data/types/response.types';
import { ProfileDataService } from './profile-data.service';

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
    private environment: EnvironmentService,
    private profileDataservice: ProfileDataService
  ) {
    this.baseUrl = `${this.environment.getApiUrl()}/authentication`;
  }

  onceUserRegistered(userRegistration: UserRegistration): Observable<APIResponseWithoutPayload> {
    return this.http.post<void>(`${this.baseUrl}/registrations`, userRegistration, this.defaultOptions)
      .pipe(
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 409:
              return of(asError('EMAIL_ALREADY_IN_USE'));
            default:
              return of(asError('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  onceUserLoggedIn(loginRequest: LoginRequest): Observable<APIResponseWithoutPayload>  {
    return this.http.post<void>(`${this.baseUrl}/login`, loginRequest , this.defaultOptions)
      .pipe(
        map(asSuccess),
        tap(_ => this.authStorageService.setLoginState(true)),
        tap(_ => this.profileDataservice.fetchProfileData()),
        catchError((error: HttpErrorResponse) => {
          switch(error.status) {
            case 401:
              return of(asError('INCORRECT_CREDENTIALS'));
            case 403:
              return of(asError('EMAIL_NOT_VALIDATED'));
            default:
              return of(asError('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  onceHumanLoggedIn(captchaToken: string): Observable<APIResponseWithoutPayload>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Captcha-Token': captchaToken,
      }),
      ...this.defaultOptions,
    };

    return this.http.post<void>(`${this.baseUrl}/loginAsHuman`, null, httpOptions)
      .pipe(
        map(asSuccess),
        tap(_ => this.authStorageService.setHumanState(true)),
        catchError((error: HttpErrorResponse) => {
          switch(error.status) {
            case 401:
              return of(asError('INCORRECT_CREDENTIALS'));
            default:
              return of(asError('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  onceAccountVerified(validationCode: string): Observable<APIResponseWithoutPayload> {
    return this.http.put<void>(`${this.baseUrl}/email-validations/${validationCode}`, null, this.defaultOptions)
      .pipe(
        map(asSuccess),
        tap(_ => this.authStorageService.setLoginState(true)),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 400:
              return of(asError('VALIDATION_ERROR'));
              default:
                return of(asError('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  onceUserLoggedOut(): Observable<APIResponseWithoutPayload> {
    return this.http.get<void>(`${this.baseUrl}/logout`, this.defaultOptions)
    .pipe(
      map(asSuccess),
      tap(_ => this.authStorageService.setLoginState(false)),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          default:
            return of(asError('SERVER_ERROR'));
        }
      })
    );
  }
}
