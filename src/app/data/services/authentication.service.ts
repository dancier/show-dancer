import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegistrationResponse,
  UserRegistration,
  VerificationResponse
} from '@data/types/authentication.types';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

const baseUrl = `${environment.dancerUrl}/authentication`;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  onceUserRegistered(userRegistration: UserRegistration): Observable<RegistrationResponse> {
    return this.http.post<void>(`${baseUrl}/register`, userRegistration, { withCredentials: true })
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

  onceUserLoggedIn(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<void>(`${baseUrl}/login`, loginRequest, { withCredentials: true })
      .pipe(
        map((_): LoginResponse => 'SUCCESS'),
        catchError((error: HttpErrorResponse): Observable<LoginResponse> => {
          console.log('error', error);
          switch (error.status) {
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

  onceAccountVerified(validationCode: string): Observable<VerificationResponse> {
    return this.http.get<void>(`${baseUrl}/email/validate/${validationCode}`, { withCredentials: true })
      .pipe(
        map((_): VerificationResponse => 'SUCCESS'),
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
}
