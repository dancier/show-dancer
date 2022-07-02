import { TestBed } from '@angular/core/testing';

import { EventLogStorageService } from './event-log-storage.service';

describe('EventLogStorageService', () => {
  let service: EventLogStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventLogStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
