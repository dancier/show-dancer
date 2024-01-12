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
import { AuthService } from '../../data-access/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  authStorageService = inject(AuthService);
  router = inject(Router);

  constructor() {}

  /**
   * Intercepts HTTP requests to handle authentication errors.
   *
   * This interceptor is necessary to handle authentication errors that may occur during the processing of an HTTP request.
   * When a 403 Forbidden error is encountered, it indicates that the user is not authenticated with the backend server.
   * In such cases, this interceptor resets the login state and redirects the user to the login page, prompting them to authenticate again.
   * Other error cases are handled individually and are not handled by this interceptor.
   *
   * @param {HttpRequest<unknown>} request - The HTTP request to be intercepted.
   * @param {HttpHandler} next - The next handler in the chain.
   * @return {Observable<HttpEvent<unknown>>} A stream of HTTP events.
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse, _: Observable<any>) => {
        if (
          error.status === HttpStatusCode.Unauthorized ||
          error.status === HttpStatusCode.Forbidden
        ) {
          this.resetLoginState();
          this.redirectToLoginPage();
        }
        return throwError(() => error);
      })
    );
  }

  private resetLoginState(): void {
    this.authStorageService.setLoginState(false);
    this.authStorageService.setHumanState(false);
  }

  private redirectToLoginPage(): void {
    this.router.navigate(['/login']);
  }
}
