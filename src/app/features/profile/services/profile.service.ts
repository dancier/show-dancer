import { Injectable } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { ProfileHttpService } from './profile-http.service';
import { Dance, PersonalData, Profile } from '../types/profile.types';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNonNull } from '@core/common/rxjs.utils';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  // profile: Profile = ProfileService.initProfile();

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

  // private static initProfile(): Profile {
  //   return {
  //     aboutMe: '',
  //     size: 0,
  //     gender: 'FEMALE',
  //     dancerName: '',
  //     birthDate: '',
  //     ableTo: [],
  //     wantsTo: [],
  //     email: '',
  //     zipCode: '',
  //     city: '',
  //     country: '',
  //     profileImageHash: '',
  //   };
  // }

  fetchProfileData(): void {
    this.profileHttpService.getProfile$().subscribe((response) => {
      if (response.isSuccess) {
        this._profile.next(response.payload);
      }
    });
  }

  // updateProfile(): void {
  //   this.profileHttpService.updateProfile$(this.profile).subscribe();
  // }

  updateProfile(profile: Profile): void {
    this.profileHttpService.updateProfile$(profile).subscribe((response) => {
      if (response.isSuccess) {
        this._profile.next(profile);
      }
    });
  }

  getProfile(): Profile | null {
    return this._profile.value;
  }

  setDancerName(dancerName: string): void {
    if (this._profile.value === null) {
      return;
    }
    this.updateProfile({
      ...this._profile.value,
      dancerName,
    });
  }

  setPersonalData(personalData: PersonalData): void {
    if (this._profile.value === null) {
      return;
    }
    this.updateProfile({
      ...this._profile.value,
      ...personalData,
    });
  }

  setOwnDances(ableTo: Dance[]): void {
    if (this._profile.value === null) {
      return;
    }
    this.updateProfile({
      ...this._profile.value,
      ableTo,
    });
  }

  setPartnerDances(wantsTo: Dance[]): void {
    if (this._profile.value === null) {
      return;
    }
    this.updateProfile({
      ...this._profile.value,
      wantsTo,
    });
  }

  updateProfileImageHash(hash: string): void {
    if (this._profile.value === null) {
      return;
    }
    this.updateProfile({
      ...this._profile.value,
      profileImageHash: hash,
    });
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

  isDancerProfileSufficient(): boolean {
    // TODO: actually check if the profile is sufficient
    return (
      this._profile.value !== null && this._profile.value.dancerName !== ''
    );
  }
}
