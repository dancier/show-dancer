import 'hammerjs';
import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// eslint-disable-next-line no-restricted-imports
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      {
        provide: LOCALE_ID,
        useValue: 'de-DE',
      },
    ],
  })
  .catch((err) => console.error(err));
