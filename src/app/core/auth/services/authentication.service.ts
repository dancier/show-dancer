import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  EmailValidationRequest,
  EmailValidationType,
  LoginRequest,
  UserRegistration,
} from '@core/auth/authentication.types';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { EnvironmentService } from '../../common/environment.service';
import { APIResponse, asError, asSuccess } from '@shared/http/response.types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private defaultOptions = {
    withCredentials: true,
  };

  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService,
    private environment: EnvironmentService
  ) {
    this.baseUrl = `${this.environment.getApiUrl()}/authentication`;
  }

  register(userRegistration: UserRegistration): Observable<APIResponse<void>> {
    return this.http
      .post<void>(
        `${this.baseUrl}/registrations`,
        userRegistration,
        this.defaultOptions
      )
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

  login(loginRequest: LoginRequest): Observable<APIResponse<void>> {
    return this.http
      .post<void>(`${this.baseUrl}/login`, loginRequest, this.defaultOptions)
      .pipe(
        map(asSuccess),
        tap((_) => this.authStorageService.setLoginState(true)),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
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

  loginAsHuman(captchaToken: string): Observable<APIResponse<void>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Captcha-Token': captchaToken,
      }),
      ...this.defaultOptions,
    };

    return this.http
      .post<void>(`${this.baseUrl}/loginAsHuman`, null, httpOptions)
      .pipe(
        map(asSuccess),
        tap((_) => this.authStorageService.setHumanState(true)),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 401:
              return of(asError('INCORRECT_CREDENTIALS'));
            default:
              return of(asError('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  emailValidation(
    emailValidationRequest: EmailValidationRequest
  ): Observable<APIResponse<void>> {
    return this.http
      .post<void>(
        `${this.baseUrl}/email-validations`,
        emailValidationRequest,
        this.defaultOptions
      )
      .pipe(
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 400:
              return of(asError('VALIDATION_ERROR'));
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }

  verifyAccount(validationCode: string): Observable<APIResponse<void>> {
    return this.http
      .put<void>(
        `${this.baseUrl}/email-validations/${validationCode}`,
        null,
        this.defaultOptions
      )
      .pipe(
        map(asSuccess),
        tap((_) => this.authStorageService.setLoginState(true)),
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

  logout(): Observable<APIResponse<void>> {
    return this.http
      .get<void>(`${this.baseUrl}/logout`, this.defaultOptions)
      .pipe(
        map(asSuccess),
        tap((_) => this.authStorageService.setLoginState(false)),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }
}
