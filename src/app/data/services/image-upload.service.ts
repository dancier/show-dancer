import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

type ImageUploadResponse =
  | 'SUCCESS'
  | 'SERVER_ERROR';

const baseUrl = `${environment.dancerUrl}`;

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {

  private defaultOptions = {
    withCredentials: true,
  }

  constructor(private http: HttpClient) {}

  uploadImage(croppedImage: string): Observable<ImageUploadResponse> {
    const formData: FormData = new FormData();
    formData.append('file', croppedImage!);
    return this.http.post<void>(`${baseUrl}/images`, formData, this.defaultOptions)
      .pipe(
        map((_): ImageUploadResponse => 'SUCCESS'),
        catchError((error: HttpErrorResponse): Observable<ImageUploadResponse> => {
          switch (error.status) {
            default:
              return of('SERVER_ERROR');
          }
        }));
  }

}
