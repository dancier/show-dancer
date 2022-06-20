
import { Component, OnDestroy } from '@angular/core';
import { ImageUploadService } from '@data/services/image-upload.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-upload.component.ts',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnDestroy {
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
