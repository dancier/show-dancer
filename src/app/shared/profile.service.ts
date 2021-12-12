import { Injectable } from '@angular/core';
import { Profile } from '../profile/profile';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  options = { withCredentials: true };

  private dancerUrl = `${environment.dancerUrl}/profile`;

  constructor(private http: HttpClient) {}

  get(): Observable<Profile> {
    return this.http.get<Profile>(this.dancerUrl, this.options);
  }
}
