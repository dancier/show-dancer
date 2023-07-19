import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { NgIf } from '@angular/common';
import { ProfileMenuButtonComponent } from '../desktop-menu/profile-menu-button.component';
import { MobileMenuButtonComponent } from '../mobile-menu/mobile-menu-button.component';
import { DesktopMenuBarComponent } from '../desktop-menu/desktop-menu-bar.component';

// TODO: Move to types file
export type MenuItem = {
  name: string;
  route: string;
  children?: MenuItem[];
};

@Component({
    selector: 'app-logged-in-navigation',
    templateUrl: './logged-in-navigation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DesktopMenuBarComponent,
        MobileMenuButtonComponent,
        ProfileMenuButtonComponent,
        NgIf,
        MobileMenuComponent,
    ],
})
export class LoggedInNavigationComponent {
  mobileMenuOpen = false;

  menuItems: MenuItem[] = [
    { name: 'Übersicht', route: '/recommendations' },
    { name: 'Nachrichten', route: '/chat' },
    {
      name: 'Über Uns',
      route: '/about-us',
      children: [
        { name: 'Unser Team', route: '/about-us/team' },
        { name: 'Unsere Vision', route: '/about-us/vision' },
      ],
    },
  ];

  constructor() {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
