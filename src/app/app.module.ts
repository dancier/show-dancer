import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

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

    // Material UI
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FlexModule,
    ExtendedModule,
    HammerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
