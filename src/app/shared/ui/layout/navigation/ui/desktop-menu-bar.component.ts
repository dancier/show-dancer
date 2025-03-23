import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MenuItem } from '../logged-in-navigation/logged-in-navigation.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { UnreadMessagesService } from '../../../../data-access/chat/unread-messages.service';

@Component({
  selector: 'app-desktop-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hidden md:block">
      <div class="ml-10 flex items-baseline space-x-4">
        <a
          *ngFor="let item of menuItems"
          #rla="routerLinkActive"
          href="#"
          class="relative flex items-center whitespace-nowrap rounded-md px-3 py-2 font-playful font-medium tracking-wide text-white no-underline transition-all duration-200 ease-in-out hover:text-gray-300"
          aria-current="page"
          routerLinkActive="bg-rose-900"
          [routerLink]="item.route"
        >
          <span
            [ngClass]="{
              'text-teal-300':
                unreadChatsCount() > 0 &&
                item.route.includes('chat') &&
                !rla.isActive
            }"
            >{{ item.name }}</span
          >
          <div
            *ngIf="
              unreadChatsCount() > 0 &&
              item.route.includes('chat') &&
              !rla.isActive
            "
            class="absolute right-0 h-1.5 w-1.5 rounded-full bg-teal-300"
          ></div>
        </a>
      </div>
    </div>
  `,
  imports: [NgFor, NgClass, RouterLinkActive, RouterLink, NgIf],
})
export class DesktopMenuBarComponent {
  @Input() menuItems: MenuItem[] = [];

  unreadChatsCount = inject(UnreadMessagesService).unreadChatsCount;
}
