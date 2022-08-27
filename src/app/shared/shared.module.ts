import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTestDirective } from '@shared/directives/data-test.directive';
import { ErrorMessagePipe } from '@data/pipes/error-message.pipe';


@NgModule({
  declarations: [
    DataTestDirective,
    ErrorMessagePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DataTestDirective,
    ErrorMessagePipe
  ],
})
export class SharedModule { }
