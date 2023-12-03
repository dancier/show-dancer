import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { MobileMenuComponent } from '../ui/mobile-menu/mobile-menu.component';
import { NgIf } from '@angular/common';
import { ProfileMenuButtonComponent } from '../ui/profile-menu-button.component';
import { MobileMenuButtonComponent } from '../ui/mobile-menu/mobile-menu-button.component';
import { DesktopMenuBarComponent } from '../ui/desktop-menu-bar.component';
import { Router } from '@angular/router';
import { ProfileMenuComponent } from '../ui/profile-menu.component';
import { delay, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClickOutsideDirective } from '../../../../util/click-outside.directive';

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
    ClickOutsideDirective,
  ],
})
export class LoggedInNavigationComponent {
  router = inject(Router);
  changeDetectorRef = inject(ChangeDetectorRef);

  mobileMenuOpen = false;
  profilePopupOpen = false;

  menuItems: MenuItem[] = [
    { name: 'Übersicht', route: '/recommendations' },
    { name: 'Nachrichten', route: '/chat' },
    { name: 'Über Uns', route: '/about-us' },
    { name: 'Kontakt', route: '/contact' },
  ];

  profileMenuItems: MenuItem[] = [
    { name: 'Dein Profil', route: '/profile' },
    { name: 'Profil bearbeiten', route: '/profile/edit' },
    { name: 'Logout', route: '/logout' },
  ];

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(() => {
      this.mobileMenuOpen = false;
      this.profilePopupOpen = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  openProfileMenu(): void {
    of(void 0)
      .pipe(delay(100))
      .subscribe(() => {
        this.profilePopupOpen = true;
        this.changeDetectorRef.detectChanges();
      });
  }

  closeProfileMenu(): void {
    this.profilePopupOpen = false;
  }
}
