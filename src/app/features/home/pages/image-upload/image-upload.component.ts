
import { Component } from '@angular/core';
import { ImageUploadService } from '@data/services/image-upload.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-upload.component.ts',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  croppedImage?: string | null | undefined;
  imageChangedEvent: any = '';

  constructor(
    private imageUploadService: ImageUploadService
  ) { }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
      this.croppedImage = event.base64;
  }

  upload(): void {
    this.imageUploadService.uploadImage$(this.croppedImage!).subscribe()
  }

}
