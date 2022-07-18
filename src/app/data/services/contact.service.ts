import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ContactPayload, ContactResponse } from '@data/types/contact.types';

const apiUrlContact = `${environment.dancerUrl}/contacts`;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private defaultOptions = {
    withCredentials: true
  }

  constructor(
    private http: HttpClient,
  ) { }

  sendMessage(message: string, sender: string ): Observable<ContactResponse> {
    const payload: ContactPayload = {
      sender,
      message
    }

    return this.http.post<void>(`${apiUrlContact}`, payload, this.defaultOptions)
      .pipe(
        map((_): ContactResponse => 'SUCCESS'),
        catchError((error: HttpErrorResponse): Observable<ContactResponse> => {
          switch (error.status) {
            default:
              return of('SERVER_ERROR');
          }
        }),
        shareReplay(1)
      );
  }
}
