import { Directive, ElementRef, Renderer2, inject } from '@angular/core';
import { EnvironmentService } from '../data-access/environment.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[data-test]',
  standalone: true,
})
export class DataTestDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private environment = inject(EnvironmentService);

  constructor() {
    const el = this.el;
    const renderer = this.renderer;
    const environment = this.environment;

    if (environment.shouldRemoveTestAttributes()) {
      renderer.removeAttribute(el.nativeElement, 'data-test');
    }
  }
}
