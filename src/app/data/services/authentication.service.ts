import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegistrationResponse,
  UserRegistration,
  VerificationResponse
} from '@data/types/authentication.types';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { AuthStorageService } from '@data/services/auth-storage.service';

const baseUrl = `${environment.apiUrl}/authentication`;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private defaultOptions = {
    withCredentials: true
  }

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
  ) {}

  onceUserRegistered(userRegistration: UserRegistration): Observable<RegistrationResponse> {
    return this.http.post<void>(`${baseUrl}/registrations`, userRegistration, this.defaultOptions)
      .pipe(
        map((_): RegistrationResponse => 'SUCCESS'),
        catchError((error: HttpErrorResponse): Observable<RegistrationResponse> => {
          switch (error.status) {
            case 409:
              return of('EMAIL_ALREADY_IN_USE');
            default:
              return of('SERVER_ERROR');
          }
        }),
        shareReplay(1)
      );
  }

  onceUserLoggedIn(loginRequest: LoginRequest): Observable<LoginResponse>  {
    return this.http.post<void>(`${baseUrl}/login`, loginRequest , this.defaultOptions)
      .pipe(
        map((_): LoginResponse => 'SUCCESS'),
        tap(_ => this.authStorageService.setLoginState(true)),
        catchError((error: HttpErrorResponse): Observable<LoginResponse> => {
          switch(error.status) {
            case 401:
              return of('INCORRECT_CREDENTIALS');
            case 403:
              return of('EMAIL_NOT_VALIDATED');
            default:
              return of('SERVER_ERROR');
          }
        }),
        shareReplay(1)
      );
  }

  onceHumanLoggedIn(captchaToken: string): Observable<LoginResponse>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Captcha-Token': captchaToken,
      }),
      ...this.defaultOptions,
    };

    return this.http.post<void>(`${baseUrl}/loginAsHuman`, null, httpOptions)
      .pipe(
        map((_): LoginResponse => 'SUCCESS'),
        tap(_ => this.authStorageService.setHumanState(true)),
        catchError((error: HttpErrorResponse): Observable<LoginResponse> => {
          switch(error.status) {
            case 401:
              return of('INCORRECT_CREDENTIALS');
            default:
              return of('SERVER_ERROR');
          }
        }),
        shareReplay(1)
      );
  }

  onceAccountVerified(validationCode: string): Observable<VerificationResponse> {
    return this.http.put<void>(`${baseUrl}/email-validations/${validationCode}`, null, this.defaultOptions)
      .pipe(
        map((_): VerificationResponse => 'SUCCESS'),
        tap(_ => this.authStorageService.setLoginState(true)),
        catchError((error: HttpErrorResponse): Observable<VerificationResponse> => {
          switch (error.status) {
            case 400:
              return of('VALIDATION_ERROR');
            default:
              return of('SERVER_ERROR');
          }
        }),
        shareReplay(1)
      );
  }

  onceUserLoggedOut(): Observable<LogoutResponse> {
    return this.http.get<void>(`${baseUrl}/logout`, this.defaultOptions)
    .pipe(
      map((_): LogoutResponse => 'SUCCESS'),
      tap(_ => this.authStorageService.setLoginState(false)),
      catchError((error: HttpErrorResponse): Observable<LogoutResponse> => {
        switch (error.status) {
          default:
            return of('SERVER_ERROR');
        }
      })
    );
  }
}
