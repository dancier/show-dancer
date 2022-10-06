import { TestBed } from '@angular/core/testing';

import { AppInstanceIdInterceptor } from './app-instance-id.interceptor';

describe('HttpHeaderInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AppInstanceIdInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: AppInstanceIdInterceptor = TestBed.inject(
      AppInstanceIdInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
