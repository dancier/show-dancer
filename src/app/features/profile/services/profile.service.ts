import { Injectable } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { ProfileHttpService } from './profile-http.service';
import { Dance, PersonalData, Profile } from '../types/profile.types';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNonNull } from '@core/common/rxjs.utils';
import { APIResponse } from '@shared/http/response.types';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _profile = new BehaviorSubject<Profile | null>(null);
  public readonly profile$: Observable<Profile> = this._profile
    .asObservable()
    .pipe(filter(isNonNull));

  constructor(
    private profileHttpService: ProfileHttpService,
    private authStorageService: AuthStorageService
  ) {
    // fetch profile data once the user is logged in
    this.authStorageService.authData$.subscribe((response) => {
      if (response.isLoggedIn) {
        this.fetchProfileData();
      }
    });
  }

  fetchProfileData(): void {
    this.profileHttpService.getProfile$().subscribe((response) => {
      if (response.isSuccess) {
        this._profile.next(response.payload);
      }
    });
  }

  updateProfile(profile: Profile): Observable<APIResponse<void>> {
    const request = this.profileHttpService.updateProfile$(profile);
    request.subscribe((response) => {
      if (response.isSuccess) {
        this._profile.next(profile);
      }
    });
    return request;
  }

  patchAndUpdateProfile(
    profile: Partial<Profile>
  ): Observable<APIResponse<void>> {
    if (this._profile.value === null) {
      // the profile should be already fetched for all modifications
      throw new Error("profile hasn't been fetched yet");
    }
    return this.updateProfile({
      ...this._profile.value,
      ...profile,
    });
  }

  getProfile(): Profile | null {
    return this._profile.value;
  }

  setDancerName(dancerName: string): Observable<APIResponse<void>> {
    return this.patchAndUpdateProfile({ dancerName });
  }

  setPersonalData(personalData: PersonalData): Observable<APIResponse<void>> {
    return this.patchAndUpdateProfile(personalData);
  }

  setOwnDances(ableTo: Dance[]): void {
    this.patchAndUpdateProfile({ ableTo });
  }

  setPartnerDances(wantsTo: Dance[]): void {
    this.patchAndUpdateProfile({ wantsTo });
  }

  updateProfileImageHash(hash: string): void {
    this.patchAndUpdateProfile({ profileImageHash: hash });
  }

  getCity$(zipCode: string): Observable<string | null> {
    return this.profileHttpService.getLocation$(zipCode).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.payload.city;
        }
        return null;
      })
    );
  }

  isDancerProfileSufficient$(): Observable<boolean> {
    // TODO: actually check if the profile is sufficient
    return this.profile$.pipe(
      map((profile) => {
        let isProfileSufficient =
          !!profile.dancerName &&
          !!profile.birthDate &&
          profile.wantsTo.length > 0 &&
          profile.ableTo.length > 0 &&
          !!profile.profileImageHash;
        return isProfileSufficient;
      })
    );
  }
}
