import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `
    <nav class="bg-rose-700">
      <div class="relative mx-auto max-w-7xl px-2 md:px-4"></div>
    </nav>
  `,
  standalone: true,
  imports: [RouterLink],
})
export class FooterComponent {
  constructor() {}
}
