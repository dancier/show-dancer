import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { de } from 'date-fns/locale';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { ROUTES } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppInstanceIdInterceptor } from '@shared/util/logging/app-instance-id.interceptor';
import { defaultStoreProvider } from '@state-adapt/angular';
import { UnauthorizedInterceptor } from '@shared/util/auth/unauthorized.interceptor';
import { WithCredentialsInterceptor } from '@shared/util/auth/with-credentials-interceptor.service';

const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UnauthorizedInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: WithCredentialsInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInstanceIdInterceptor,
    multi: true,
  },
];

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      // Angular
      BrowserModule,
      // Material UI
      MatToolbarModule,
      MatButtonModule,
      MatMenuModule,
      MatIconModule
    ),
    defaultStoreProvider,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    httpInterceptorProviders,
    provideRouter(
      ROUTES,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    {
      provide: LOCALE_ID,
      useValue: 'de-DE',
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: de,
    },
  ],
};
