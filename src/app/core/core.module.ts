import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './common/module-import.guard';


/**
 * The Core Module should only be loaded once in the application.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
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
