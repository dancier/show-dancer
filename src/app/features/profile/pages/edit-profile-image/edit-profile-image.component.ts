import { Component } from '@angular/core';
import { ImageUploadService } from '@features/profile/services/image-upload.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ProfileService } from '../../services/profile.service';
import { APIResponse } from '@shared/http/response.types';
import { UploadedImageDao } from '../../types/profile.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile-image',
  templateUrl: './edit-profile-image.component.html',
  styleUrls: ['./edit-profile-image.component.scss'],
})
export class EditProfileImageComponent {
  croppedImage?: string | null | undefined;
  imageChangedEvent: any = '';
  uploadResonse?: APIResponse<UploadedImageDao>;

  constructor(
    private imageUploadService: ImageUploadService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  upload(): void {
    this.imageUploadService
      .uploadImage$(this.croppedImage!)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.profileService.updateProfileImageHash(response.payload.hash);
        }
        this.uploadResonse = response;
      });
  }

  nextStep(): void {
    this.router.navigate(['profile']);
  }
}
