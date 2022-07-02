import { Injectable } from '@angular/core';

const APP_INSTANCE_ID = 'appInstanceId';

@Injectable({
  providedIn: 'root',
})
export class AppInstanceStorageService {
  constructor() {}

  getAppIntanceId(): string | null {
    return localStorage.getItem(APP_INSTANCE_ID);
  }

  setAppInstanceId(appInstanceId: string): void {
    localStorage.setItem(APP_INSTANCE_ID, appInstanceId);
  }
}
