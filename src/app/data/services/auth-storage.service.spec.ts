import { TestBed } from '@angular/core/testing';

import { AuthStorageService } from './auth-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthStorageService', () => {
  let service: AuthStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
