
import { Component, ViewChild } from '@angular/core';
import { ImgCropperConfig, ImgCropperEvent, LyImageCropper, ImgCropperErrorEvent } from '@alyle/ui/image-cropper';
import { ImageUploadService } from '@data/services/image-upload.service';

@Component({
  selector: 'app-image-upload.component.ts',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  croppedImage?: string;
  scale!: number;
  ready!: boolean;
  minScale!: number;
  @ViewChild(LyImageCropper) cropper!: LyImageCropper;
  myConfig: ImgCropperConfig = {
    width: 150,
    height: 150,
    fill: '#ff2997',
    type: 'image/png',
    responsiveArea: true
  };

  constructor(
    private imageUploadService: ImageUploadService
  ) { }

  onCropped(e: ImgCropperEvent): void {
    this.croppedImage = e.dataURL;
  }

  onError(e: ImgCropperErrorEvent): void {
    console.warn(`'${e.name}' is not a valid image`, e);
  }

  setScale(e: any): void {
    if (Number.isNaN(e.value)) {
      this.scale = e.value;
    }
  }

  upload(): void {
    this.imageUploadService.uploadImage$(this.croppedImage!).subscribe()
  }

}
