import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { EnvironmentService } from '@shared/data-access/environment.service';
import {
  APIResponse,
  asError,
  asSuccess,
} from '@shared/util/http/response.types';
import { UploadedImageDao } from './types/profile.types';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private defaultOptions = {
    withCredentials: true,
  };

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {}

  dataURItoBlob(dataURI: string): Blob {
    const binary = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString,
    });
  }

  uploadImage$(
    croppedImage: string
  ): Observable<APIResponse<UploadedImageDao>> {
    const blobFromDataUrl = this.dataURItoBlob(croppedImage);
    const formData: FormData = new FormData();
    formData.append('file', blobFromDataUrl);
    return this.http
      .post<UploadedImageDao>(
        `${this.environment.getApiUrl()}/images`,
        formData,
        this.defaultOptions
      )
      .pipe(
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }
}
