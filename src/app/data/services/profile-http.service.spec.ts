import { TestBed } from '@angular/core/testing';

import { ProfileHttpService } from './profile-http.service';

describe('ProfileHttpService', () => {
  let service: ProfileHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
