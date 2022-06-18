import { NgModule } from '@angular/core';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerModule,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './layout/footer/footer/footer.component';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import {
  LyHammerGestureConfig,
  LY_THEME,
  LY_THEME_NAME,
  StyleRenderer,
  LyTheme2,
} from '@alyle/ui';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    NavigationComponent,
    FooterComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Core & Shared
    CoreModule,
    SharedModule,

    // App
    AppRoutingModule,
    // Image upload
    BrowserAnimationsModule,
    LyImageCropperModule,

    // Material UI
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FlexModule,
    ExtendedModule,
    HammerModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: LyHammerGestureConfig,
    },
    StyleRenderer,
    LyTheme2,
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    {
      provide: LY_THEME,
      useClass: MinimaLight,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
