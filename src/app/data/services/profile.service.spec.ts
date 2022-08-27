import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
  });

  it.skip('should be created', () => {
    expect(service).toBeTruthy();
  });
});
