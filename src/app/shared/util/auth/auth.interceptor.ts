import { inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthStorageService } from '../../data-access/auth/auth-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authStorageService = inject(AuthStorageService);
  router = inject(Router);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse, _: Observable<any>) => {
        if (httpErrorResponse.status === HttpStatusCode.Unauthorized) {
          // reset login state
          this.authStorageService.setLoginState(false);
          this.authStorageService.setHumanState(false);
          // redirect to login page
          this.router.navigate(['/login']);
        }
        return throwError(() => httpErrorResponse);
      })
    );
  }
}
