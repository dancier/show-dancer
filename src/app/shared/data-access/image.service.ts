import { Injectable, inject } from '@angular/core';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private environmentService = inject(EnvironmentService);

  private readonly defaultImage = 'assets/img/profile-placeholder.svg';
  private readonly imageBaseUrl = `${this.environmentService.getApiUrl()}/images`;

  getDancerImageSrcOrDefault(
    imageHash: string | undefined | null,
    width: number
  ): string {
    if (!imageHash) {
      return this.getDefaultDancerImage();
    }
    return `${this.imageBaseUrl}/${imageHash}/${width}.png`;
  }

  getDefaultDancerImage(): string {
    return this.defaultImage;
  }
}
