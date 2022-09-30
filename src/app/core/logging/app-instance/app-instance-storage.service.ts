import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

const APP_INSTANCE_ID = 'appInstanceId';

@Injectable({
  providedIn: 'root',
})
export class AppInstanceStorageService {
  constructor() {}

  initializeAppInstanceId(): string {
    let appInstanceId = uuid();
    return this.setAppInstanceId(appInstanceId);
  }

  getAppIntanceId(): string | null {
    return localStorage.getItem(APP_INSTANCE_ID);
  }

  isInitialPageRequest(): boolean {
    return this.getAppIntanceId() == null
  }

  private setAppInstanceId(appInstanceId: string): string {
    localStorage.setItem(APP_INSTANCE_ID, appInstanceId);
    return appInstanceId;
  }
}
