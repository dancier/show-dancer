import { TestBed } from '@angular/core/testing';

import { AuthWithCredentialsInterceptor } from './auth-with-credentials.interceptor';

describe('AuthWithCredentialsInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AuthWithCredentialsInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AuthWithCredentialsInterceptor = TestBed.inject(
      AuthWithCredentialsInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
