import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MobileMenuComponent } from '../ui/mobile-menu/mobile-menu.component';
import { NgIf } from '@angular/common';
import { ProfileMenuButtonComponent } from '../ui/profile-menu-button.component';
import { MobileMenuButtonComponent } from '../ui/mobile-menu/mobile-menu-button.component';
import { DesktopMenuBarComponent } from '../ui/desktop-menu-bar.component';
import { Router } from '@angular/router';
import { ProfileMenuComponent } from '../ui/profile-menu.component';

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
    ProfileMenuComponent,
  ],
})
export class LoggedInNavigationComponent {
  router = inject(Router);

  mobileMenuOpen = false;
  profilePopupOpen = false;

  menuItems: MenuItem[] = [
    { name: 'Übersicht', route: '/recommendations' },
    { name: 'Nachrichten', route: '/chat' },
    { name: 'Über Uns', route: '/about-us' },
    { name: 'Kontakt', route: '/contact' },
    { name: 'Logout', route: '/logout' },
  ];

  profileMenuItems: MenuItem[] = [
    { name: 'Dein Profil', route: '/profile' },
    { name: 'Profil bearbeiten', route: '/profile/edit' },
    { name: 'Logout', route: '/logout' },
  ];

  constructor() {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onProfileButtonClicked(): void {
    this.profilePopupOpen = !this.profilePopupOpen;
  }

  /**
   * TODO: have profile menu bar hide on navigation and when clicking outside of it
   * How would I do it?
   * - Have a service that keeps track of the state of the profile menu bar
   * - Have a directive that listens to clicks outside of the profile menu bar
   * - Have a directive that listens to navigation events
   */
}
