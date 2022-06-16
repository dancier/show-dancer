import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export type AuthData = {
  isLoggedIn: boolean;
};

const AUTH_DATA_KEY = 'authData';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private _authData$ = new BehaviorSubject<AuthData>(AuthStorageService.initFromLocalStorage())

  public readonly authData$ = this._authData$.asObservable();

  constructor(private http: HttpClient) { }

  private static initFromLocalStorage(): AuthData {
    const authItem = localStorage.getItem(AUTH_DATA_KEY);
    if (authItem) {
      return JSON.parse(authItem);
    } else {
      return {
        isLoggedIn: false,
      };
    }
  }

  public setLoginState(loginState: boolean): void {
    const newAuthData = {
      isLoggedIn: loginState,
    }
    localStorage.setItem('myData', JSON.stringify(newAuthData));
    this._authData$.next(newAuthData);
  }



  // public receive$(): Observable<boolean> {
  //   return this._authData$.asObservable();
  // }

}
