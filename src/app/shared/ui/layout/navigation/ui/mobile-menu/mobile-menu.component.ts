import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from '../../logged-in-navigation/logged-in-navigation.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-1 px-2 pb-3 pt-2">
      <ng-container *ngFor="let item of menuItems">
        <a
          href="#"
          class="block rounded-md px-4 py-3 text-lg font-medium text-white no-underline"
          aria-current="page"
          routerLinkActive="bg-rose-900"
          [routerLink]="item.route"
          >{{ item.name }}</a
        >
        <ng-container *ngIf="item.children">
          <a
            *ngFor="let childItem of item.children"
            href="#"
            class="ml-6 block rounded-md px-4 py-3 text-lg font-medium text-white no-underline"
            aria-current="page"
            routerLinkActive="bg-rose-900"
            [routerLink]="childItem.route"
            >{{ childItem.name }}</a
          >
        </ng-container>
      </ng-container>
    </div>
  `,
  imports: [NgFor, RouterLinkActive, RouterLink, NgIf],
})
export class MobileMenuComponent {
  @Input() menuItems: MenuItem[] = [];
}
