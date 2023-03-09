import { Injectable } from '@angular/core';
import { EnvironmentService } from '../common/environment.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly defaultImage = 'assets/img/profile-placeholder.svg';
  private readonly imageBaseUrl = `${this.environmentService.getApiUrl()}/images`;

  constructor(private environmentService: EnvironmentService) {}

  getDancerImageSrcOrDefault(imageHash: string | null, width: number): string {
    if (!imageHash) {
      return this.getDefaultDancerImage();
    }
    return `${this.imageBaseUrl}/${imageHash}/${width}.png`;
  }

  getDefaultDancerImage(): string {
    return this.defaultImage;
  }
}
