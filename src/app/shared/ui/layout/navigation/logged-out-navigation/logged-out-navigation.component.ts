import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DesktopMenuBarComponent } from '../ui/desktop-menu-bar.component';
import { MobileMenuButtonComponent } from '../ui/mobile-menu/mobile-menu-button.component';
import { MobileMenuComponent } from '../ui/mobile-menu/mobile-menu.component';
import { MenuItem } from '../logged-in-navigation/logged-in-navigation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logged-out-navigation',
  templateUrl: './logged-out-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DesktopMenuBarComponent,
    MobileMenuButtonComponent,
    MobileMenuComponent,
    CommonModule,
  ],
})
export class LoggedOutNavigationComponent {
  mobileMenuOpen = false;

  menuItemsLeft: MenuItem[] = [
    { name: 'Über Uns', route: '/about-us' },
    { name: 'Kontakt', route: '/contact' },
  ];

  menuItemsRight: MenuItem[] = [
    { name: 'Registrieren', route: '/registration' },
    { name: 'Login', route: '/login' },
  ];

  constructor() {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
