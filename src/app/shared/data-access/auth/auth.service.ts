import { Injectable, Signal } from '@angular/core';
import { BehaviorSubject, distinct, filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export type AuthData = {
  isLoggedIn: boolean;
  isHuman: boolean;
  jwt: string;
};

const AUTH_DATA_KEY = 'authData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authData$ = new BehaviorSubject<AuthData>(
    AuthService.initFromLocalStorage()
  );

  public readonly authData$ = this._authData$.asObservable();

  public isLoggedIn: Signal<boolean> = toSignal(
    this.authData$.pipe(map((data) => data.isLoggedIn)),
    { initialValue: false }
  );

  public readonly hasLoggedOut$ = this.authData$.pipe(
    distinct((authData) => authData.isLoggedIn),
    filter((authData) => !authData.isLoggedIn)
  );

  constructor() {}

  private static initFromLocalStorage(): AuthData {
    const authItem = localStorage.getItem(AUTH_DATA_KEY);
    if (authItem) {
      return JSON.parse(authItem);
    } else {
      return {
        jwt: '',
        isLoggedIn: false,
        isHuman: false,
      };
    }
  }

  public setLoginState(loginState: boolean, jwt?: string): void {
    const newAuthData = {
      ...this._authData$.getValue(),
      isLoggedIn: loginState,
      jwt: jwt || '',
    };
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(newAuthData));
    this._authData$.next(newAuthData);
  }

  public setHumanState(humanState: boolean): void {
    const newAuthData = {
      ...this._authData$.getValue(),
      isHuman: humanState,
    };
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(newAuthData));
    this._authData$.next(newAuthData);
  }

  public getSnapshot(): AuthData {
    return this._authData$.getValue();
  }
}
