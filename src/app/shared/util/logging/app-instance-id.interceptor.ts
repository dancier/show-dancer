import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppInstanceStorageService } from '../../data-access/log/app-instance-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppInstanceIdInterceptor implements HttpInterceptor {
  private appInstanceStorageService = inject(AppInstanceStorageService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const appinstanceId = this.appInstanceStorageService.getAppIntanceId();
    const modifiedReq = appinstanceId
      ? req.clone({
          headers: req.headers.set('x-app-instance-id', appinstanceId),
        })
      : req;
    return next.handle(modifiedReq);
  }
}
