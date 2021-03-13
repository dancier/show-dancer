import { Injectable } from '@angular/core';
import { Profile } from './profile/profile';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  options = {withCredentials:true}

  private dancerUrl = "https://dancer.dancier.net/profile"

  constructor(private http: HttpClient) { }

  get(): Observable<Profile> {

    return this.http.get<Profile>(this.dancerUrl, this.options)
  }
}
