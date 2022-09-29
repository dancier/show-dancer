import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AuthData = {
  isLoggedIn: boolean;
  isHuman: boolean;
};

const AUTH_DATA_KEY = 'authData';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private _authData$ = new BehaviorSubject<AuthData>(AuthStorageService.initFromLocalStorage())

  public readonly authData$ = this._authData$.asObservable();

  constructor() { }

  private static initFromLocalStorage(): AuthData {
    const authItem = localStorage.getItem(AUTH_DATA_KEY);
    if (authItem) {
      return JSON.parse(authItem);
    } else {
      return {
        isLoggedIn: false,
        isHuman: false,
      };
    }
  }

  public setLoginState(loginState: boolean): void {
    const newAuthData = {
      ...this._authData$.getValue(),
      isLoggedIn: loginState,
    }
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(newAuthData));
    this._authData$.next(newAuthData);
  }

  public setHumanState(humanState: boolean): void {
    const newAuthData = {
      ...this._authData$.getValue(),
      isHuman: humanState,
    }
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(newAuthData));
    this._authData$.next(newAuthData);
  }

  public getSnapshot(): AuthData {
    return this._authData$.getValue();
  }

}
