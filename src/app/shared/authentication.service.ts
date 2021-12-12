import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const baseUrl = `${environment.dancerUrl}/authentication`;

export type UserRegistration = {
  name: string;
  username: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  registerUser(userRegistration: UserRegistration) {
    return this.http.post(baseUrl, userRegistration);
  }
}
