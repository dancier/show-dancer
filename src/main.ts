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
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { de } from 'date-fns/locale';

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
    {
      provide: MAT_DATE_LOCALE,
      useValue: de,
    },
  ],
}).catch((err) => console.error(err));
