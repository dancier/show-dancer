import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  EmailValidationCodeRequest,
  LoginRequest,
  LoginResponse,
  PasswordChangeRequest,
  UserRegistration,
} from './authentication.types';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { EnvironmentService } from '../environment.service';
import {
  asError,
  asSuccess,
  OldAPIResponse,
} from '../../util/http/response.types';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private defaultOptions = {
    withCredentials: true,
  };

  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private authStorageService: AuthService,
    private environment: EnvironmentService
  ) {
    this.baseUrl = `${this.environment.getApiUrl()}/authentication`;
    this.mockLogin();
  }

  mockLogin(): void {
    this.authStorageService.setLoginState(true, 'jwt-local-test-token');
  }

  register(
    userRegistration: UserRegistration
  ): Observable<OldAPIResponse<void>> {
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

  login(loginRequest: LoginRequest): Observable<OldAPIResponse<LoginResponse>> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/login`,
        loginRequest,
        this.defaultOptions
      )
      .pipe(
        map(asSuccess),
        tap((response) =>
          this.authStorageService.setLoginState(
            true,
            response.payload?.accessToken
          )
        ),
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

  loginAsHuman(captchaToken: string): Observable<OldAPIResponse<void>> {
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

  requestPasswordChange(
    passwordChangeRequest: PasswordChangeRequest
  ): Observable<OldAPIResponse<void>> {
    return this.http
      .post<void>(
        `${this.baseUrl}/password-changes`,
        passwordChangeRequest,
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

  requestEmailValidationCode(
    emailValidationCodeRequest: EmailValidationCodeRequest
  ): Observable<OldAPIResponse<void>> {
    return this.http
      .post<void>(
        `${this.baseUrl}/email-validations`,
        emailValidationCodeRequest,
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

  changePassword(
    validationCode: string,
    password: string
  ): Observable<OldAPIResponse<void>> {
    return this.http
      .put<void>(
        `${this.baseUrl}/password-changes/${validationCode}`,
        { password },
        this.defaultOptions
      )
      .pipe(
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 400:
              return of(asError('CODE_VALIDATION_ERROR'));
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }

  verifyAccount(validationCode: string): Observable<OldAPIResponse<void>> {
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

  logout(): Observable<OldAPIResponse<void>> {
    return this.http
      .get<void>(`${this.baseUrl}/logout`, this.defaultOptions)
      .pipe(
        map(asSuccess),
        tap((_) => {
          this.authStorageService.setLoginState(false);
          this.authStorageService.setHumanState(false);
        }),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }
}
