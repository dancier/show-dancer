import { Component, inject } from '@angular/core';
import { ImageUploadService } from '../../../data-access/image-upload.service';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { OldAPIResponse } from '@shared/util/http/response.types';
import { UploadedImageDao } from '../../../data-access/types/profile.types';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-init-profile-image',
  templateUrl: './init-profile-image.component.html',
  styleUrls: ['./init-profile-image.component.scss'],
  imports: [MatButtonModule, ImageCropperModule],
})
export class InitProfileImageComponent {
  private imageUploadService = inject(ImageUploadService);
  private profileService = inject(OwnProfileService);
  private router = inject(Router);

  croppedImage?: string | null | undefined;
  imageChangedEvent: any = '';
  uploadResponse?: OldAPIResponse<UploadedImageDao>;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  uploadAndNext(): void {
    this.uploadProfilePicture();
    this.nextStep();
  }

  private uploadProfilePicture(): void {
    this.imageUploadService
      .uploadImage$(this.croppedImage!)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.profileService.updateProfileImageHash(response.payload.hash);
        }
        this.uploadResponse = response;
      });
  }

  nextStep(): void {
    this.router.navigate(['profile']);
  }
}
