import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { EnvironmentService } from '../environment.service';
import {
  asError,
  asSuccess,
  OldAPIResponse,
} from '../../util/http/response.types';
import {
  Location,
  NameAvailability,
  Profile,
} from '../../../profile/data-access/types/profile.types';

@Injectable({
  providedIn: 'root',
})
export class ProfileHttpService {
  private defaultOptions = {
    withCredentials: true,
  };
  private readonly profileApiUrl: string;
  private readonly locationApiUrl: string;

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.profileApiUrl = `${this.environment.getApiUrl()}/profile`;
    this.locationApiUrl = `${this.environment.getApiUrl()}/location`;
  }

  getProfile$(): Observable<OldAPIResponse<Profile>> {
    return this.http
      .get<Profile>(`${this.profileApiUrl}`, this.defaultOptions)
      .pipe(
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }

  updateProfile$(profile: Profile): Observable<OldAPIResponse<void>> {
    return this.http
      .put<void>(`${this.profileApiUrl}`, profile, this.defaultOptions)
      .pipe(
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        }),
        shareReplay(1)
      );
  }

  checkNameAvailability$(
    dancerName: string
  ): Observable<OldAPIResponse<NameAvailability>> {
    return this.http
      .get<NameAvailability>(
        `${this.profileApiUrl}/checkDancerNameAvailability/${dancerName}`,
        this.defaultOptions
      )
      .pipe(
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }

  getLocation$(zipCode: string): Observable<OldAPIResponse<Location>> {
    // there is only one country 'GER' at the moment
    return this.http
      .get<Location>(
        `${this.locationApiUrl}/zipCode/GER/${zipCode}`,
        this.defaultOptions
      )
      .pipe(
        map((payload) => asSuccess(payload)),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 404:
              return of(asError('ZIP_CODE_NOT_FOUND'));
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }
}
