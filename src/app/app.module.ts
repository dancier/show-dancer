import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './layout/footer/footer/footer.component';
import { ModernLayoutComponent } from './layout/modern-layout/modern-layout.component';
import { NarrowPageComponent } from './layout/narrow-page/narrow-page.component';
import { LoggedInNavigationComponent } from './layout/navigation/logged-in-navigation/logged-in-navigation.component';
import { LoggedOutNavigationComponent } from './layout/navigation/logged-out-navigation/logged-out-navigation.component';
import { MobileMenuButtonComponent } from './layout/navigation/mobile-menu/mobile-menu-button.component';
import { MobileMenuComponent } from './layout/navigation/mobile-menu/mobile-menu.component';
import { DesktopMenuBarComponent } from './layout/navigation/desktop-menu/desktop-menu-bar.component';
import { ProfileMenuButtonComponent } from './layout/navigation/desktop-menu/profile-menu-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    NavigationComponent,
    FooterComponent,
    ModernLayoutComponent,
    NarrowPageComponent,
    LoggedInNavigationComponent,
    LoggedOutNavigationComponent,
    MobileMenuButtonComponent,
    MobileMenuComponent,
    DesktopMenuBarComponent,
    ProfileMenuButtonComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,

    // Core & Shared
    CoreModule,
    SharedModule,

    // App
    AppRoutingModule,

    // Material UI
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
