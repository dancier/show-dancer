import { TestBed } from '@angular/core/testing';

import { AuthData, AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService | undefined;
  let setItemSpy: jest.SpyInstance;
  let getItemSpy: jest.SpyInstance;

  beforeAll(() => {
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
  });

  afterEach(() => {
    service = undefined;
    setItemSpy.mockReset();
    getItemSpy.mockReset();
  });

  afterAll(() => {
    setItemSpy.mockRestore();
    getItemSpy.mockRestore();
  });

  it('is created', () => {
    service = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });

  it('checks auth data upon creation', () => {
    const expectedAuthData: AuthData = {
      isLoggedIn: true,
      isHuman: true,
      jwt: '123',
    };
    getItemSpy.mockImplementation((key: string) => {
      if (key === 'authData') {
        return JSON.stringify(expectedAuthData);
      }
      return null;
    });

    service = TestBed.inject(AuthService);

    const actualAuthData = service.getSnapshot();
    expect(actualAuthData).toEqual(expectedAuthData);
  });

  it('defaults to no authorization upon creation', () => {
    getItemSpy.mockImplementation((_key: string) => {
      return null;
    });

    service = TestBed.inject(AuthService);

    const expectedAuthData: AuthData = {
      isLoggedIn: false,
      isHuman: false,
      jwt: '',
    };
    const actualAuthData = service.getSnapshot();
    expect(actualAuthData).toEqual(expectedAuthData);
  });

  describe('when the login state is set', () => {
    const listener = jest.fn();

    beforeEach(() => {
      listener.mockClear();
      service = TestBed.inject(AuthService);
      service.authData$.subscribe(listener);

      service.setLoginState(true);
      service.setHumanState(false);
    });

    it('sets the state in local storage', () => {
      expect(setItemSpy).toHaveBeenCalledWith(
        'authData',
        JSON.stringify({
          jwt: '',
          isLoggedIn: true,
          isHuman: false,
        })
      );
    });

    it('informs subscribers about the change', () => {
      expect(listener).toHaveBeenCalledWith({
        isLoggedIn: true,
        isHuman: false,
        jwt: '',
      });
    });
  });

  describe('when the human state is set', () => {
    const listener = jest.fn();

    beforeEach(() => {
      listener.mockClear();
      service = TestBed.inject(AuthService);
      service.authData$.subscribe(listener);
      service.setLoginState(false);
      service.setHumanState(true);
    });

    it('sets the state in local storage', () => {
      expect(setItemSpy).toHaveBeenCalledWith(
        'authData',
        JSON.stringify({
          jwt: '',
          isLoggedIn: false,
          isHuman: true,
        })
      );
    });

    it('informs subscribers about the change', () => {
      expect(listener).toHaveBeenCalledWith({
        jwt: '',
        isLoggedIn: false,
        isHuman: true,
      });
    });
  });
});
