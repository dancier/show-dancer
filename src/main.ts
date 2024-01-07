import 'hammerjs';
import { enableProdMode } from '@angular/core';

// eslint-disable-next-line no-restricted-imports
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { APP_CONFIG } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import * as de from '@angular/common/locales/de';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(de.default, 'de-DE');

bootstrapApplication(AppComponent, APP_CONFIG).catch((err) =>
  console.error(err)
);
