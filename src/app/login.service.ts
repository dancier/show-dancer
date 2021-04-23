import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OidcProvider } from './login/oidcProvider';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = `${environment.dancerUrl}/login`;

  constructor(private http: HttpClient) { }

  get(): Observable<OidcProvider[]>{
    return this.http.get<OidcProvider[]>(this.loginUrl);
  }
}
