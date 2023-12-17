import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStorageService } from '../../data-access/auth/auth-storage.service';
import { EnvironmentService } from '../../data-access/environment.service';

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {
  private authStorage = inject(AuthStorageService);
  private environment = inject(EnvironmentService);

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedRequest;
    if (this.environment.isLocalDevelopment()) {
      // enable to use the jwt token instead during local development
      // modifiedRequest = this.addJwtAuthorization(request);
      modifiedRequest = this.addCredentialsCookie(request);
    } else {
      modifiedRequest = this.addCredentialsCookie(request);
    }

    return next.handle(modifiedRequest);
  }

  private addJwtAuthorization(request: HttpRequest<any>): HttpRequest<any> {
    if (!this.authStorage.getSnapshot().isLoggedIn) {
      return request;
    }

    const jwt = this.authStorage.getSnapshot().jwt;
    return request.clone({
      headers: request.headers.append('Authorization', `Bearer ${jwt}`),
    });
  }

  private addCredentialsCookie(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      withCredentials: true,
    });
  }
}
