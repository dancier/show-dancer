import { Injectable } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { ProfileHttpService } from './profile-http.service';
import { Dance, PersonalData, Profile } from '../types/profile.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile: Profile = ProfileService.initProfile();

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

  private static initProfile(): Profile {
    return {
      aboutMe: '',
      size: 0,
      gender: 'FEMALE',
      dancerName: '',
      birthDate: '',
      ableTo: [],
      wantsTo: [],
      email: '',
      zipCode: '',
      city: '',
      country: '',
      profileImageHash: '',
    };
  }

  fetchProfileData(): void {
    this.profileHttpService.getProfile$().subscribe((response) => {
      if (response.isSuccess) {
        this.profile = response.payload;
      }
    });
  }

  updateProfile(): void {
    this.profileHttpService.updateProfile$(this.profile).subscribe();
  }

  getProfile(): Profile {
    return this.profile;
  }

  setDancerName(dancerName: string): void {
    this.profile.dancerName = dancerName;
    console.debug('dancerName', dancerName);
    console.debug('profile', this.profile);
  }

  setPersonalData(personalData: PersonalData): void {
    this.profile = {
      ...this.profile,
      ...personalData,
    };
    console.debug('personalData', personalData);
    console.debug('profile', this.profile);
  }

  setOwnDances(ableTo: Dance[]): void {
    // eslint-disable-next-line no-console
    console.debug('ableTo', ableTo);
    this.profile.ableTo = ableTo;
    console.debug('profile', this.profile);
  }

  setPartnerDances(wantsTo: Dance[]): void {
    console.debug('wantsTo', wantsTo);
    this.profile.wantsTo = wantsTo;
    console.debug('profile', this.profile);
  }

  getCity$(zipCode = this.profile.zipCode): Observable<string | null> {
    return this.profileHttpService.getLocation$(zipCode).pipe(
      map((response) => {
        if (response.isSuccess) {
          console.log('response', response);
          this.profile.city = response.payload.city;
          return this.profile.city;
        }
        return null;
      })
    );
  }
}
