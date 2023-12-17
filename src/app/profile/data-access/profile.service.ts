import { inject, Injectable } from '@angular/core';
import { EnvironmentService } from '@shared/data-access/environment.service';
import { HttpClient } from '@angular/common/http';
import { PublicProfile } from './types/public-profile.types';
import { Observable } from 'rxjs';
import { toApiResponse } from '@shared/util/http/response.utils';
import { ApiResponse } from '@shared/util/http/response.types';
import { ImageService } from '@shared/data-access/image.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly imageService = inject(ImageService);
  private readonly profileApiUrl = `${inject(
    EnvironmentService
  ).getApiUrl()}/profile`;

  // public getOwnProfile(): void {}
  //

  public getPublicProfile(
    dancerId: string
  ): Observable<ApiResponse<PublicProfile>> {
    return toApiResponse(
      this.http.get<PublicProfile>(`${this.profileApiUrl}/${dancerId}`)
    );
  }

  getProfileImageSrc(imgHash: string | undefined, width = 150): string {
    if (imgHash) {
      return this.imageService.getDancerImageSrcOrDefault(imgHash, width);
    } else {
      return this.imageService.getDancerImageSrcOrDefault(null, width);
    }
  }

  getDefaultProfileImage(): string {
    return this.imageService.getDefaultDancerImage();
  }
}
