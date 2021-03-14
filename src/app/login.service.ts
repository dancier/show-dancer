import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OidcProvider } from './login/oidcProvider';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = "https://dancer.dancier.net/login"

  constructor(private http: HttpClient) { }

  get(): Observable<OidcProvider[]>{
    return this.http.get<OidcProvider[]>(this.loginUrl)
  }
}
