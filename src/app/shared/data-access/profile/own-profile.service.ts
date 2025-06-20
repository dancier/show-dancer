import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfileHttpService } from './profile-http.service';
import {
  Dance,
  PersonalData,
  Profile,
} from '../../../profile/data-access/types/profile.types';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNonNull } from '../../util/rxjs.utils';
import { OldAPIResponse } from '../../util/http/response.types';
import { EnvironmentService } from '../environment.service';
import { ImageService } from '../image.service';

@Injectable({
  providedIn: 'root',
})
export class OwnProfileService {
  private profileHttpService = inject(ProfileHttpService);
  private authStorageService = inject(AuthService);
  private environmentService = inject(EnvironmentService);
  private imageService = inject(ImageService);

  private _profile = new BehaviorSubject<Profile | null>(null);
  public readonly profile$: Observable<Profile> = this._profile
    .asObservable()
    .pipe(filter(isNonNull));

  constructor() {
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

  updateProfile(profile: Profile): Observable<OldAPIResponse<void>> {
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
  ): Observable<OldAPIResponse<void>> {
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

  setProfile(profile: Partial<Profile>): Observable<OldAPIResponse<void>> {
    return this.patchAndUpdateProfile(profile);
  }

  setDancerName(dancerName: string): Observable<OldAPIResponse<void>> {
    return this.patchAndUpdateProfile({ dancerName });
  }

  setPersonalData(
    personalData: PersonalData
  ): Observable<OldAPIResponse<void>> {
    return this.patchAndUpdateProfile(personalData);
  }

  setOwnDances(ableTo: Dance[]): Observable<OldAPIResponse<void>> {
    return this.patchAndUpdateProfile({ ableTo });
  }

  setPartnerDances(wantsTo: Dance[]): Observable<OldAPIResponse<void>> {
    return this.patchAndUpdateProfile({ wantsTo });
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
        const isProfileSufficient =
          !!profile.dancerName &&
          !!profile.birthDate &&
          profile.wantsTo.length > 0 &&
          profile.ableTo.length > 0;
        return isProfileSufficient;
      })
    );
  }

  getProfileImageSrc(width = 150): Observable<string> {
    return this.profile$.pipe(
      map((profile) => {
        if (profile.profileImageHash) {
          return this.imageService.getDancerImageSrcOrDefault(
            profile.profileImageHash,
            width
          );
        } else {
          return this.imageService.getDancerImageSrcOrDefault(null, width);
        }
      })
    );
  }

  getDefaultProfileImage(): string {
    return this.imageService.getDefaultDancerImage();
  }
}
