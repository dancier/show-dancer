import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

const APP_INSTANCE_ID = 'appInstanceId';

@Injectable({
  providedIn: 'root',
})
export class AppInstanceStorageService {
  constructor() {}

  initializeAppInstanceId(): string {
    let appInstanceId = uuid.v4();
    return this.setAppInstanceId(appInstanceId);
  }

  getAppIntanceId(): string | null {
    return localStorage.getItem(APP_INSTANCE_ID);
  }

  isInitialPageRequest(): boolean {
    if (this.getAppIntanceId() == null) {
      // user accesses dancer the first time from this device
      this.initializeAppInstanceId();
      return true;
    }
    return false;
  }

  private setAppInstanceId(appInstanceId: string): string {
    localStorage.setItem(APP_INSTANCE_ID, appInstanceId);
    return appInstanceId;
  }
}
