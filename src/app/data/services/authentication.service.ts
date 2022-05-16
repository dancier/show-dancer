import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, UserRegistration } from '@data/types/authentication.types';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

const baseUrl = `${environment.dancerUrl}/authentication`;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  registerUser(userRegistration: UserRegistration) {
    return this.http.post<void>(`${baseUrl}/register`, userRegistration);
  }

  onceUserLoginAttempt(loginRequest: LoginRequest): Observable<LoginResponse>  {
    //return this.http.post<void>(`${baseUrl}/login`, loginRequest , {withCredentials :true})
    return this.http.post<void>(`${baseUrl}/login`, loginRequest )
      .pipe(
        map((_): LoginResponse => 'SUCCESS'),
        catchError((error: HttpErrorResponse): Observable<LoginResponse> => {
          console.log('error', error);
          switch(error.status) {
            case 200:
              return of('SUCCESS');
            case 401:
              return of('INCORRECT_CREDENTIALS');
            case 403:
              return of('EMAIL_NOT_VALIDATED');
            default:
              return of('SERVER_ERROR');
          }
        }),
        shareReplay()
      );
  }
}
