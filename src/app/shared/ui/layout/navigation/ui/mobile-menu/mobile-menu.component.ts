import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from '../../logged-in-navigation/logged-in-navigation.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-1 px-2 pb-3 pt-2">
      @for (item of menuItems; track item.route) {
        <a
          href="#"
          class="block rounded-md px-4 py-3 text-lg font-medium text-white no-underline"
          aria-current="page"
          routerLinkActive="bg-rose-900"
          [routerLink]="item.route"
          [attr.data-testid]="'nav' + item.route.replace('/', '-')"
          >{{ item.name }}</a
        >
        @if (item.children) {
          @for (childItem of item.children; track childItem.route) {
            <a
              href="#"
              class="ml-6 block rounded-md px-4 py-3 text-lg font-medium text-white no-underline"
              aria-current="page"
              routerLinkActive="bg-rose-900"
              [routerLink]="childItem.route"
              [attr.data-testid]="'nav' + childItem.route.replace('/', '-')"
              >{{ childItem.name }}</a
            >
          }
        }
      }
    </div>
  `,
  imports: [RouterLinkActive, RouterLink],
})
export class MobileMenuComponent {
  @Input() menuItems: MenuItem[] = [];
}
