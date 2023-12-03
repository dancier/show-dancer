import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { EnvironmentService } from '../data-access/environment.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[data-test]',
  standalone: true,
})
export class DataTestDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private environment: EnvironmentService
  ) {
    if (environment.shouldRemoveTestAttributes()) {
      renderer.removeAttribute(el.nativeElement, 'data-test');
    }
  }
}
