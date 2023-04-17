import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { EnvironmentService } from '@core/common/environment.service';
import { MockService } from 'ng-mocks';
import { moduleDeclarations, moduleImports } from './chat.module';
import { flushRequests, MockedRequest } from '@test-utils/http-utils';
import { Chat } from './common/types/chat.types';

type TestMessage = {
  from: string;
  text: string;
};

type TestChat = {
  partner: string;
  messages: TestMessage[];
};

function getMockedRequestsForChats(...chats: TestChat[]): MockedRequest[] {
  const completeChats: Chat[] = chats.map((chat, index) => ({
    chatId: index.toString(),
    dancerIds: [chat.partner],
    lastActivity: null,
    type: 'DIRECT',
    lastMessage: null,
  }));

  return [
    {
      method: 'GET',
      url: 'http://test.de/chat',
      body: {
        chats: completeChats,
      },
    },
  ];
}

describe('Chat Feature', () => {
  let spectator: Spectator<ChatPageComponent>;
  let httpMock: HttpTestingController;

  const createComponent = createComponentFactory({
    component: ChatPageComponent,
    declarations: moduleDeclarations,
    providers: [
      {
        provide: EnvironmentService,
        useValue: MockService(EnvironmentService, {
          getApiUrl: () => 'http://test.de',
        }),
      },
    ],
    imports: [...moduleImports, HttpClientTestingModule],
  });

  beforeEach(async () => {
    spectator = createComponent();
    httpMock = TestBed.inject(HttpTestingController);
    await spectator.fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  xit('displays an empty view when there have been no chats yet', () => {});

  /*
  const mockedRequests: MockedRequest[] = [
  {
    method: 'GET',
    url: 'http://test.de/profile',
    body: {},
  },
  {
    method: 'GET',
    url: 'http://test.de/profile/checkDancerNameAvailability/nameNotAvailable',
    body: { available: false },
  },
  {
    method: 'GET',
    url: 'http://test.de/profile/checkDancerNameAvailability/nameAvailable',
    body: { available: true },
  },
];

    spectator.typeInElement('nameNotAvailable', byTestId('username-field'));
    spectator.click(byTestId('submit-button'));
    flushRequests(httpMock, mockedRequests);
    spectator.detectChanges();
    expect(spectator.query(byTestId('username-error'))).toBeTruthy();
   */

  it('displays a list of previous chats', () => {
    const mockedRequests = getMockedRequestsForChats(
      {
        partner: 'TestDancer1',
        messages: [{ from: 'TestDancer1', text: 'Hello 1' }],
      },
      {
        partner: 'TestDancer2',
        messages: [{ from: 'TestDancer2', text: 'Hello 2' }],
      }
    );

    flushRequests(httpMock, mockedRequests);
    spectator.detectChanges();
    expect(spectator.queryAll(byTestId('chat-list-entry')).length).toBe(2);
  });

  xit('displays previous chat messages when a chat is selected', () => {});

  xit('displays new messages as they arrive', () => {});

  xit('allows the user to send a message', () => {});
});
