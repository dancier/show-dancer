import { AuthHttpService } from './auth-http.service';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { AuthService } from './auth.service';
import { EnvironmentService } from '../environment.service';
import { LoginRequest, UserRegistration } from './authentication.types';
import { MockService } from 'ng-mocks';
import { TestRequest } from '@angular/common/http/testing';
import { APIError } from '../../util/http/response.types';

describe('AuthHttpService', () => {
  let spectator: SpectatorHttp<AuthHttpService>;
  const createHttp = createHttpFactory({
    service: AuthHttpService,
    mocks: [AuthService],
  });

  beforeEach(() => {
    const environmentService = MockService(EnvironmentService, {
      getApiUrl: () => 'http://test-url.de',
    });

    spectator = createHttp({
      providers: [
        {
          provide: EnvironmentService,
          useValue: environmentService,
        },
      ],
    });
  });

  describe('when user registration is attempted', () => {
    const userRegistration: UserRegistration = {
      email: 'mail@test.de',
      password: 'securePassword',
      acceptTermsAndConditions: true,
    };

    it.each`
      status | isSuccess | error
      ${200} | ${true}   | ${undefined}
      ${409} | ${false}  | ${'EMAIL_ALREADY_IN_USE'}
      ${500} | ${false}  | ${'SERVER_ERROR'}
      ${418} | ${false}  | ${'SERVER_ERROR'}
    `(
      'when HTTP status code is $status, returns a response where isSuccess = $isSuccess with error "$error"',
      ({ status, isSuccess, error }) => {
        let responseSuccess: boolean | undefined;
        let responseError: APIError | undefined;
        spectator.service.register(userRegistration).subscribe((response) => {
          responseSuccess = response.isSuccess;
          if (!response.isSuccess) {
            responseError = response.error;
          }
        });

        spectator
          .expectOne(
            'http://test-url.de/authentication/registrations',
            HttpMethod.POST
          )
          .flush(null, {
            status,
            statusText: 'statusText',
          });
        expect(responseSuccess).toBe(isSuccess);
        expect(responseError).toBe(error);
      }
    );
  });

  describe('when user login is attempted', () => {
    const loginRequest: LoginRequest = {
      email: 'mail@test.de',
      password: 'securePassword',
    };

    it.each`
      status | isSuccess | error
      ${200} | ${true}   | ${undefined}
      ${401} | ${false}  | ${'INCORRECT_CREDENTIALS'}
      ${403} | ${false}  | ${'EMAIL_NOT_VALIDATED'}
      ${500} | ${false}  | ${'SERVER_ERROR'}
      ${418} | ${false}  | ${'SERVER_ERROR'}
    `(
      'when HTTP status code is $status, returns a response where isSuccess = $isSuccess with error "$error"',
      ({ status, isSuccess, error }) => {
        let responseSuccess: boolean | undefined;
        let responseError: APIError | undefined;
        spectator.service.login(loginRequest).subscribe((response) => {
          responseSuccess = response.isSuccess;
          if (!response.isSuccess) {
            responseError = response.error;
          }
        });

        spectator
          .expectOne('http://test-url.de/authentication/login', HttpMethod.POST)
          .flush(null, {
            status,
            statusText: 'statusText',
          });
        expect(responseSuccess).toBe(isSuccess);
        expect(responseError).toBe(error);
      }
    );

    it('sets the login state in the auth storage service', () => {
      const authStorageService = spectator.inject(AuthService);
      spectator.service.login(loginRequest).subscribe();

      spectator
        .expectOne('http://test-url.de/authentication/login', HttpMethod.POST)
        .flush(null, {
          status: 200,
          statusText: 'OK',
        });
      expect(authStorageService.setLoginState).toHaveBeenCalledWith(
        true,
        undefined
      );
    });

    it("doesn't set the login state in the auth storage service when login fails", () => {
      const authStorageService = spectator.inject(AuthService);
      spectator.service.login(loginRequest).subscribe();

      spectator
        .expectOne('http://test-url.de/authentication/login', HttpMethod.POST)
        .flush(null, {
          status: 401,
          statusText: 'Unauthorized',
        });
      expect(authStorageService.setLoginState).not.toHaveBeenCalled();
    });
  });

  describe('when login as human is attempted', () => {
    const captchaToken = 'captchaToken';

    it.each`
      status | isSuccess | error
      ${200} | ${true}   | ${undefined}
      ${401} | ${false}  | ${'INCORRECT_CREDENTIALS'}
      ${500} | ${false}  | ${'SERVER_ERROR'}
      ${418} | ${false}  | ${'SERVER_ERROR'}
    `(
      'when HTTP status code is $status, returns a response where isSuccess = $isSuccess with error "$error"',
      ({ status, isSuccess, error }) => {
        let responseSuccess: boolean | undefined;
        let responseError: APIError | undefined;
        spectator.service.loginAsHuman(captchaToken).subscribe((response) => {
          responseSuccess = response.isSuccess;
          if (!response.isSuccess) {
            responseError = response.error;
          }
        });

        spectator
          .expectOne(
            'http://test-url.de/authentication/loginAsHuman',
            HttpMethod.POST
          )
          .flush(null, {
            status,
            statusText: 'statusText',
          });
        expect(responseSuccess).toBe(isSuccess);
        expect(responseError).toBe(error);
      }
    );

    it('sends the captcha token as a header', () => {
      spectator.service.loginAsHuman(captchaToken).subscribe();

      const req: TestRequest = spectator.expectOne(
        'http://test-url.de/authentication/loginAsHuman',
        HttpMethod.POST
      );
      req.flush(null, {
        status: 200,
        statusText: 'OK',
      });
      expect(req.request.headers.get('X-Captcha-Token')).toEqual(captchaToken);
    });

    it('sets the human state in the auth storage service', () => {
      const authStorageService = spectator.inject(AuthService);
      spectator.service.loginAsHuman(captchaToken).subscribe();

      spectator
        .expectOne(
          'http://test-url.de/authentication/loginAsHuman',
          HttpMethod.POST
        )
        .flush(null, {
          status: 200,
          statusText: 'OK',
        });
      expect(authStorageService.setHumanState).toHaveBeenCalledWith(true);
    });

    it("doesn't set the human state in the auth storage service when human login fails", () => {
      const authStorageService = spectator.inject(AuthService);
      spectator.service.loginAsHuman(captchaToken).subscribe();

      spectator
        .expectOne(
          'http://test-url.de/authentication/loginAsHuman',
          HttpMethod.POST
        )
        .flush(null, {
          status: 401,
          statusText: 'Unauthorized',
        });
      expect(authStorageService.setHumanState).not.toHaveBeenCalled();
    });
  });

  // TODO: more tests for logout and other methods
});
