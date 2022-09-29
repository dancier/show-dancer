import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTestDirective } from '@shared/directives/data-test.directive';
import { ErrorMessagePipe } from '@shared/http/error-message.pipe';
import { AgePipe } from '@shared/pipes/age.pipe';


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
