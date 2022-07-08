import { TestBed } from '@angular/core/testing';

import { HttpHeaderInterceptor } from './http-header.interceptor';

describe('HttpHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpHeaderInterceptor = TestBed.inject(HttpHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
