import { Injectable } from '@angular/core';
// eslint-disable-next-line no-restricted-imports
import { environment } from '../../../environments/environment';

/**
 * Service that provides the content of the environments.ts file.
 * This improves testing by using the dependency injection system to inject the environment.
 */
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor() {}

  public getJestTestmode(): boolean {
    // can be overwritten in tests
    return false;
  }

  public isProduction(): boolean {
    return environment.production;
  }

  public isLocalDevelopment(): boolean {
    return !environment.production;
  }

  public getApiUrl(): string {
    return environment.apiUrl;
  }

  public isMockBackendEnabled(): boolean {
    return environment.mockBackend;
  }

  public shouldRemoveTestAttributes(): boolean {
    return environment.removeTestAttributes;
  }

  public getEnvironment(): typeof environment {
    return environment;
  }
}
