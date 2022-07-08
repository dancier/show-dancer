import { TestBed } from '@angular/core/testing';

import { EventLogHttpService } from './event-log-http.service';

describe('EventLogHttpService', () => {
  let service: EventLogHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventLogHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
