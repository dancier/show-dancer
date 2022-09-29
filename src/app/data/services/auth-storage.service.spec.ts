import { TestBed } from '@angular/core/testing';

import { AuthData, AuthStorageService } from './auth-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthStorageService', () => {
  let service: AuthStorageService | undefined;
  let setItemSpy: jest.SpyInstance;
  let getItemSpy: jest.SpyInstance;

  beforeAll(() => {
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
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
    service = TestBed.inject(AuthStorageService);
    expect(service).toBeTruthy();
  });

  it('checks auth data upon creation', () => {
    const expectedAuthData: AuthData = {
      isLoggedIn: true,
      isHuman: true,
    };
    getItemSpy.mockImplementation((key: string) => {
      if (key === 'authData') {
        return JSON.stringify(expectedAuthData);
      }
      return null;
    });

    service = TestBed.inject(AuthStorageService);

    const actualAuthData = service.getSnapshot();
    expect(actualAuthData).toEqual(expectedAuthData);
  });

  it('defaults to no authorization upon creation', () => {
    getItemSpy.mockImplementation((key: string) => {
      return null;
    });

    service = TestBed.inject(AuthStorageService);

    const expectedAuthData: AuthData = {
      isLoggedIn: false,
      isHuman: false,
    };
    const actualAuthData = service.getSnapshot();
    expect(actualAuthData).toEqual(expectedAuthData);
  });

  describe('when the login state is set', () => {
    let listener = jest.fn();

    beforeEach(() => {
      listener.mockClear();
      service = TestBed.inject(AuthStorageService);
      service.authData$.subscribe(listener);

      service.setLoginState(true);
    });

    it('sets the state in local storage', () => {
      expect(setItemSpy).toHaveBeenCalledWith('authData', JSON.stringify({
        isLoggedIn: true,
        isHuman: false,
      }));
    });

    it('informs subscribers about the change', () => {
      expect(listener).toHaveBeenCalledWith({
        isLoggedIn: true,
        isHuman: false,
      });
    });
  });

  describe('when the human state is set', () => {
    let listener = jest.fn();

    beforeEach(() => {
      listener.mockClear();
      service = TestBed.inject(AuthStorageService);
      service.authData$.subscribe(listener);

      service.setHumanState(true);
    });

    it('sets the state in local storage', () => {
      expect(setItemSpy).toHaveBeenCalledWith('authData', JSON.stringify({
        isLoggedIn: false,
        isHuman: true,
      }));
    });

    it('informs subscribers about the change', () => {
      expect(listener).toHaveBeenCalledWith({
        isLoggedIn: false,
        isHuman: true,
      });
    });
  });

});
