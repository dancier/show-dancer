import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTestDirective } from '@shared/directives/data-test.directive';

@NgModule({
  declarations: [DataTestDirective],
  imports: [CommonModule],
  exports: [DataTestDirective],
})
export class SharedModule {}
