import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { EnvironmentService } from '@core/common/environment.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[data-test]'
})
export class DataTestDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private environment: EnvironmentService
  ) {
    if (environment.getProduction()) {
      renderer.removeAttribute(el.nativeElement, 'data-test');
    }
  }
}
