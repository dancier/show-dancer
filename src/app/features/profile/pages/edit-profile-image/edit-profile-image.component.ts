import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageUploadService } from '@data/services/image-upload.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-profile-image',
  templateUrl: './edit-profile-image.component.html',
  styleUrls: ['./edit-profile-image.component.scss']
})
export class EditProfileImageComponent implements OnDestroy {
  croppedImage?: string | null | undefined;
  imageChangedEvent: any = '';
  imageUploadSubscription: Subscription | undefined;

  constructor(
    private imageUploadService: ImageUploadService
  ) { }

  ngOnDestroy(): void {
    this.imageUploadSubscription?.unsubscribe();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  upload(): void {
    this.imageUploadSubscription = this.imageUploadService.uploadImage$(this.croppedImage!).subscribe()
  }

}
