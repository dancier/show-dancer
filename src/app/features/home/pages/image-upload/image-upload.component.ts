
import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { StyleRenderer, lyl, WithStyles } from '@alyle/ui';
import { ImgCropperConfig, ImgCropperEvent, LyImageCropper, ImgCropperErrorEvent, ImgCropperLoaderConfig } from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';
import { environment } from '../../../../../environments/environment';
import { ImageUploadService } from '@data/services/image-upload.service';

const baseUrl = `${environment.dancerUrl}/`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const STYLES = () => ({
  cropper: lyl`{
    max-width: 400px
    height: 300px
  }`,
  sliderContainer: lyl`{
    text-align: center
    max-width: 400px
    margin: 14px
  }`
});

@Component({
  selector: 'app-image-upload.component.ts',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements WithStyles, AfterViewInit {
  classes = this.sRenderer.renderSheet(STYLES);
  croppedImage?: string;
  scale!: number;
  ready!: boolean;
  minScale!: number;
  @ViewChild(LyImageCropper) cropper!: LyImageCropper;
  myConfig: ImgCropperConfig = {
    // autoCrop: true,
    width: 150, // Default `250`
    height: 150, // Default `200`
    fill: '#ff2997', // Default transparent if type == png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    responsiveArea: true
  };


  constructor(
    readonly sRenderer: StyleRenderer,
    private _platform: Platform,
    private imageUploadService: ImageUploadService
  ) { }

  ngAfterViewInit(): void {

    if (this._platform.isBrowser) {
      const config: ImgCropperLoaderConfig = {
        scale: 0.745864772531767,
        xOrigin: 642.380608078103,
        yOrigin: 236.26357452128866,
        areaWidth: 100,
        areaHeight: 100,
        rotation: 0,
        originalDataURL: ''
      };
      this.cropper.loadImage(config);
    }

  }

  onCropped(e: ImgCropperEvent): void {
    this.croppedImage = e.dataURL;
  }
  onLoaded(e: ImgCropperEvent): void {
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
    this.imageUploadService.uploadImage(this.croppedImage!).subscribe()
  }

}
