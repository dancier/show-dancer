import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `
    <nav class="relative bg-rose-700">
      <div
        class="flex max-w-7xl justify-center gap-8 py-2 px-2 text-sm text-white md:px-4 mx-auto"
      >
        <div>Mit ♥ vom <a routerLink="about-us">Dancier-Team</a></div>
        <div><a routerLink="imprint">Impressum</a></div>
      </div>
    </nav>
  `,
  standalone: true,
  imports: [RouterLink],
})
export class FooterComponent {
  constructor() {}
}
