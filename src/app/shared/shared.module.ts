import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTestDirective } from '@shared/directives/data-test.directive';
import { AgePipe } from '@data/pipes/age.pipe';
import { ErrorMessagePipe } from '@shared/error-handling/error-message.pipe';


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
