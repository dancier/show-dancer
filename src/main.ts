import 'hammerjs';
import { enableProdMode, LOCALE_ID, importProvidersFrom } from '@angular/core';

// eslint-disable-next-line no-restricted-imports
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app/app-routing.module';
import { CoreModule } from '@core/core.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      // Angular
      BrowserModule,
      // Core & Shared
      CoreModule,
      // App
      AppRoutingModule,
      // Material UI
      MatToolbarModule,
      MatButtonModule,
      MatMenuModule,
      MatIconModule
    ),
    provideAnimations(),
    {
      provide: LOCALE_ID,
      useValue: 'de-DE',
    },
  ],
}).catch((err) => console.error(err));
