import { Injectable } from '@angular/core';
import {
  DancePreferences,
  PersonalData,
  Profile,
} from '@data/types/profile.types';
import { AuthStorageService } from './auth-storage.service';
import { ProfileHttpService } from './profile-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile: Profile = this.initProfile();

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
        this.profile = response.payload;
      }
    });
  }

  updateProfile(): void {
    this.profileHttpService.updateProfile$(this.profile).subscribe()
  }

  getProfile(): Profile {
    return this.profile;
  }

  setDancerName(dancerName: string): void {
    this.profile.dancerName = dancerName;
  }

  setPersonalData(personalData: PersonalData): void {
    for (const [key, value] of Object.entries(personalData)) {
      this.profile[key] = value;
    }
  }

  setOwnDances(ableTo: DancePreferences[]): void {
    // eslint-disable-next-line no-console
    console.log(ableTo);
    this.profile.ableTo = ableTo;
  }

  setPartnerDances(wantsTo: DancePreferences[]): void {
    this.profile.wantsTo = wantsTo;
  }

  initProfile(): Profile {
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
}
