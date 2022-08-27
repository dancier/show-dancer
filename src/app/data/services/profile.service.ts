import { Injectable } from '@angular/core';
import { Profile } from '@data/types/profile.types';
import { ProfileHttpService } from './profile-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  profile: Profile = this.initProfile()

  constructor(private profileHttpService: ProfileHttpService) {}

  fetchProfileData(): void {
    this.profileHttpService.getProfile$().subscribe((response) => {
      if (response.isSuccess) {
        this.profile = response.payload
      }
    });
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
      age: 0,
    };
  }
}
