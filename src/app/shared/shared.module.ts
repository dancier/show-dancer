import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTestDirective } from '@shared/directives/data-test.directive';
import { ErrorMessagePipe } from '@data/pipes/error-message.pipe';
import { AgePipe } from '@data/pipes/age.pipe';


@NgModule({
  declarations: [
    DataTestDirective,
    ErrorMessagePipe,
    AgePipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DataTestDirective,
    ErrorMessagePipe,
    AgePipe
  ],
})
export class SharedModule { }
