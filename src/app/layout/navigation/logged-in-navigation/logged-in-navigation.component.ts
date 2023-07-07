import { ChangeDetectionStrategy, Component } from '@angular/core';

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