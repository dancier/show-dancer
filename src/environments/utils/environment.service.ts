import { Injectable } from '@angular/core';
// eslint-disable-next-line no-restricted-imports
import { environment } from '../environment';

/**
 * Service that provides the content of the environments.ts file.
 * This improves testing by using the dependency injection system to inject the environment.
 */
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  public getProduction(): boolean {
    return environment.production;
  }

  public getDancerUrl(): string {
    return environment.dancerUrl;
  }
}
