import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest';
import { EventLogHttpService } from '@data/services/event-log-http.service';
import { Event } from '@data/types/eventlog.types';
import { EnvironmentService } from '../../../environments/utils/environment.service';

describe('EventLogHttpService', () => {
  let spectator: SpectatorHttp<EventLogHttpService>;
  const createHttp = createHttpFactory({
    service: EventLogHttpService,
    mocks: [EnvironmentService],
  });

  beforeEach(() => spectator = createHttp());

  beforeEach(() => {
    const environment = spectator.inject(EnvironmentService);
    environment.getDancerUrl.andReturn('testApiUrl');
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should post event', () => {
    const event: Event = {
      topic: 'test',
      metaData: {
        sourceTime: new Date().toISOString(),
        appInstanceId: 'test',
      },
      payload: {},
    };

    spectator.service.postEvent$(event).subscribe();

    const request = spectator.expectOne('testApiUrl/eventlog', HttpMethod.POST);
    expect(request.request.body).toEqual(event);
  });
});
