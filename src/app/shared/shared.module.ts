import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTestDirective } from '@shared/directives/data-test.directive';
import { ErrorMessagePipe } from '@shared/http/error-message.pipe';
import { AgePipe } from '@shared/pipes/age.pipe';
import { AlertComponent } from './components/alert/alert.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DataTestDirective, ErrorMessagePipe, AgePipe, AlertComponent],
  imports: [CommonModule, MatIconModule],
  exports: [DataTestDirective, ErrorMessagePipe, AgePipe, AlertComponent],
})
export class SharedModule {}
