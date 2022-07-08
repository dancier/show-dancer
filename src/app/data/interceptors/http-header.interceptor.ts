import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppInstanceStorageService } from '@data/services/app-instance-storage.service';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  constructor(private appInstanceStorageService: AppInstanceStorageService) {}

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
