import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { EventLogService } from './event-log.service';
import { EventLogHttpService } from './event-log-http.service';

describe('AuthService', () => {
  let spectator: SpectatorService<EventLogService>;
  const createService = createServiceFactory({
    service: EventLogService,
    mocks: [EventLogHttpService],
  });

  beforeEach(() => (spectator = createService()));

  it('should not be logged in', () => {
    expect(spectator.service).toBeTruthy();
  });
});
