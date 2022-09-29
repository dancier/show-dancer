import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './common/module-import.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppInstanceIdInterceptor } from '@core/logging/app-instance/app-instance-id.interceptor';


/**
 * The Core Module should only be loaded once in the application.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInstanceIdInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {

  /**
   * Instructs DI to try and inject an already loaded CoreModule.
   * If it finds any, it throws an error.
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
