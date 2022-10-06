import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppInstanceStorageService } from '@core/logging/app-instance/app-instance-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppInstanceIdInterceptor implements HttpInterceptor {
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
