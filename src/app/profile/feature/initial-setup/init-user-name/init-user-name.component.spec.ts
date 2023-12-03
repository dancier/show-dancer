import { TestBed } from '@angular/core/testing';
import { InitUserNameComponent } from './init-user-name.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EnvironmentService } from '@shared/data-access/environment.service';
import { MockProvider, MockService } from 'ng-mocks';
import {
  byTestId,
  createRoutingFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthStorageService } from '@shared/data-access/auth/auth-storage.service';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { InitPersonalDataComponent } from '../init-personal-data/init-personal-data.component';
import { flushRequests, MockedRequest } from '@shared/util/test/http-utils';
import { NgZone } from '@angular/core';

const mockedRequests: MockedRequest[] = [
  {
    method: 'GET',
    url: 'http://test.de/profile',
    body: {},
  },
  {
    method: 'GET',
    url: 'http://test.de/profile/checkDancerNameAvailability/nameNotAvailable',
    body: { available: false },
  },
  {
    method: 'GET',
    url: 'http://test.de/profile/checkDancerNameAvailability/nameAvailable',
    body: { available: true },
  },
];

describe('Setting up username', () => {
  let spectator: Spectator<InitUserNameComponent>;
  let httpMock: HttpTestingController;

  const createComponent = createRoutingFactory({
    component: InitUserNameComponent,
    imports: [
      InitPersonalDataComponent,
      HttpClientTestingModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
    ],
    providers: [
      {
        provide: EnvironmentService,
        useValue: MockService(EnvironmentService, {
          getApiUrl: () => 'http://test.de',
        }),
      },
      MockProvider(AuthStorageService, {
        authData$: of({ isLoggedIn: true, isHuman: true }),
      }),
    ],
    stubsEnabled: false,
    routes: [
      {
        path: '',
        component: InitUserNameComponent,
      },
      {
        path: 'profile/initial-setup/personal-info',
        component: InitPersonalDataComponent,
      },
    ],
  });

  beforeEach(async () => {
    spectator = createComponent();
    httpMock = TestBed.inject(HttpTestingController);
    await spectator.fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('when the entered username is not available', () => {
    beforeEach(() => {
      spectator.typeInElement('nameNotAvailable', byTestId('username-field'));
      spectator.click(byTestId('submit-button'));
      flushRequests(httpMock, mockedRequests);
      spectator.detectChanges();
    });

    it('shows an error', () => {
      expect(spectator.query(byTestId('username-error'))).toBeTruthy();
    });

    it('does not save the username', async () => {
      httpMock.expectNone({ method: 'PUT', url: 'http://test.de/profile' });
      await spectator.fixture.whenStable();
      expect(spectator.inject(Location).path()).toBe('/');
    });
  });

  describe('when the entered username is available', () => {
    beforeEach(() => {
      spectator.typeInElement('nameAvailable', byTestId('username-field'));
      spectator.click(byTestId('submit-button'));
      flushRequests(httpMock, mockedRequests);
      spectator.detectChanges();
    });

    it('does not show an error', () => {
      httpMock.expectOne({ method: 'PUT', url: 'http://test.de/profile' });
      expect(spectator.query(byTestId('username-error'))).toBeNull();
    });

    it('saves the username and navigates to the next step', async () => {
      TestBed.inject(NgZone).run(() => {
        httpMock
          .expectOne({ method: 'PUT', url: 'http://test.de/profile' })
          .flush({});
      });
      await spectator.fixture.whenStable();
      expect(spectator.inject(Location).path()).toBe(
        '/profile/initial-setup/personal-info'
      );
    });
  });
});
