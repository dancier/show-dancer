import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from '../logged-in-navigation/logged-in-navigation.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-desktop-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hidden md:block">
      <div class="ml-10 flex items-baseline space-x-4">
        <a
          *ngFor="let item of menuItems"
          href="#"
          class="rounded-md px-3 py-2 font-playful font-medium tracking-wide text-white no-underline transition-all duration-200 ease-in-out hover:text-gray-300"
          aria-current="page"
          routerLinkActive="bg-rose-900"
          [routerLink]="item.route"
          >{{ item.name }}</a
        >
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgFor, RouterLinkActive, RouterLink],
})
export class DesktopMenuBarComponent {
  @Input() menuItems: MenuItem[] = [];
}
