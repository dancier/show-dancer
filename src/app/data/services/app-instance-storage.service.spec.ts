import { TestBed } from '@angular/core/testing';

import { AppInstanceStorageService } from './app-instance-storage.service';

describe('AppInstanceStorageService', () => {
  let service: AppInstanceStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInstanceStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
