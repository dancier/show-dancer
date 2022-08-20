import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NameAvailability, Profile } from '@data/types/profile.types';
import { APIResponse } from '@data/types/shared.types';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.dancerUrl}/profile`;

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  private defaultOptions = {
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getProfile$(): Observable<APIResponse | Profile> {
    return this.http.get<Profile>(`${baseUrl}`, this.defaultOptions).pipe(
      catchError((error: HttpErrorResponse): Observable<APIResponse> => {
        switch (error.status) {
          default:
            return of('SERVER_ERROR');
        }
      })
    );
  }

  updateProfile$(profile: Profile): Observable<APIResponse | Profile> {
    return this.http.put<Profile>(`${baseUrl}`, profile, this.defaultOptions).pipe(
      catchError((error: HttpErrorResponse): Observable<APIResponse> => {
        switch (error.status) {
          default:
            return of('SERVER_ERROR');
        }
      })
    );
  }

  checkNameAvailability$(dancerName: string): Observable<APIResponse> {
    return this.http.get<NameAvailability>(`${baseUrl}/checkDancerNameAvailibility/${dancerName}`, this.defaultOptions).pipe(
      map((availability): APIResponse => availability ? 'SUCCESS' : 'NOT_AVAILABLE'),
      catchError((error: HttpErrorResponse): Observable<APIResponse> => {
        switch (error.status) {
          default:
            return of('SERVER_ERROR');
        }
      })
    );
  }
}
