import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '@data/services/authentication.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // if an 401 is returned from the backend, remove login state from the user so that he needs to login again
    return next.handle(request).pipe(
      tap({
        next: () => {},
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            this.authenticationService.onceUserLoggedOut().subscribe()
            this.router.navigate(['']);
          }
        },
      })
    );
  }
}
