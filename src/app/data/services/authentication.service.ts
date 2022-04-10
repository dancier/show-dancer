import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserRegistration } from '@data/types/registration.types';

const baseUrl = `${environment.dancerUrl}/authentication`;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  registerUser(userRegistration: UserRegistration) {
    return this.http.post(`${baseUrl}/register`, userRegistration);
  }
}
