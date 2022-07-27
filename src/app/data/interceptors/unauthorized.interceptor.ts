import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthStorageService } from '@data/services/auth-storage.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authStorageService: AuthStorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // if an 401 is returned from the backend, remove login state from the user so that he needs to login/do a caoture again
    return next.handle(request).pipe(
      catchError((returnedError) => {
        if (returnedError instanceof HttpErrorResponse) {
          if (returnedError.status === HttpStatusCode.Unauthorized) {
            this.authStorageService.setHumanState(false);
            this.authStorageService.setLoginState(false);
          }
        }
        throw returnedError;
      })
    );
  }
}
