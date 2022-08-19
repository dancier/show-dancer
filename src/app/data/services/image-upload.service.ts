import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { EnvironmentService } from '../../../environments/utils/environment.service';

type ImageUploadResponse = 'SUCCESS' | 'SERVER_ERROR';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private defaultOptions = {
    withCredentials: true,
  };

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService,
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

  uploadImage$(croppedImage: string): Observable<ImageUploadResponse> {
    const blobFromDataUrl = this.dataURItoBlob(croppedImage);
    const formData: FormData = new FormData();
    formData.append('file', blobFromDataUrl);
    return this.http
      .post<void>(`${this.environment.getDancerUrl()}/images`, formData, this.defaultOptions)
      .pipe(
        map((_): ImageUploadResponse => 'SUCCESS'),
        catchError(
          (error: HttpErrorResponse): Observable<ImageUploadResponse> => {
            switch (error.status) {
              default:
                return of('SERVER_ERROR');
            }
          }
        )
      );
  }
}
