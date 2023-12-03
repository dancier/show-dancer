import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../logged-in-navigation/logged-in-navigation.component';
import { RouterLink } from '@angular/router';
import { ClickOutsideDirective } from '@shared/common/directives/click-outside.directive';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, ClickOutsideDirective],
  template: `
    <div
      class="absolute right-4 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabindex="-1"
    >
      <!-- Active: "bg-gray-100", Not Active: "" -->
      <a
        *ngFor="let item of menuItems"
        href="#"
        class="text-md block px-4 py-2 text-gray-700 no-underline hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
        tabindex="-1"
        [routerLink]="item.route"
        >{{ item.name }}</a
      >
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileMenuComponent {
  @Input() menuItems: MenuItem[] = [];
}
