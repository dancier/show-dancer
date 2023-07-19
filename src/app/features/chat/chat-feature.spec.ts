import {
  byRole,
  byText,
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
import { ChatDto, ChatMessage, DancerMapDto } from './common/types/chat.types';
import { RouterTestingModule } from '@angular/router/testing';

type TestMessage = {
  from: string;
  text: string;
};

type TestChat = {
  partner: string;
};

function getMockedRequestsForChats(...chats: TestChat[]): MockedRequest[] {
  const completeChats: ChatDto[] = chats.map((chat, index) => ({
    chatId: index.toString(),
    dancerIds: [chat.partner],
    lastActivity: null,
    type: 'DIRECT',
    lastMessage: null,
  }));
  const dancersInfo: DancerMapDto = chats.reduce((acc, chat) => {
    acc[chat.partner] = {
      id: chat.partner,
      dancerName: chat.partner,
      city: 'TestCity',
      profileImageHash: 'someHash',
    };
    return acc;
  }, {} as DancerMapDto);

  return [
    {
      method: 'GET',
      url: 'http://test.de/chats',
      body: {
        chats: completeChats,
      },
    },
    {
      method: 'POST',
      url: 'http://test.de/dancers',
      body: dancersInfo,
    },
  ];
}

function getMockedRequestsForMessages(
  chatId: string,
  ...messages: TestMessage[]
): MockedRequest[] {
  const chatMessages: ChatMessage[] = messages.map((message, index) => ({
    id: index.toString(),
    authorId: message.from,
    from: message.from,
    text: message.text,
    createdAt: new Date().toISOString(),
    readByDancers: [],
  }));
  return [
    {
      method: 'GET',
      url: `http://test.de/chats/${chatId}/messages`,
      body: {
        messages: chatMessages,
      },
    },
  ];
}

describe('Chat Feature', () => {
  let spectator: Spectator<ChatPageComponent>;
  let httpMock: HttpTestingController;

  const createComponent = createComponentFactory({
    component: ChatPageComponent,
    providers: [
      {
        provide: EnvironmentService,
        useValue: MockService(EnvironmentService, {
          getApiUrl: () => 'http://test.de',
          getJestTestmode: () => true,
        }),
      },
    ],
    imports: [
      ...moduleImports,
      ...moduleDeclarations,
      HttpClientTestingModule,
      RouterTestingModule.withRoutes([
        {
          path: 'chat',
          component: ChatPageComponent,
        },
        {
          path: 'chat/:participantId',
          component: ChatPageComponent,
        },
      ]),
    ],
  });

  // beforeEach(() => {
  //   jest.useFakeTimers();
  // });

  // beforeAll(() => {
  //   jest.useFakeTimers();
  // });

  beforeEach(async () => {
    spectator = createComponent();
    httpMock = TestBed.inject(HttpTestingController);
    await spectator.fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  //   xit('displays an empty view when there have been no chats yet', () => {});
  //
  //   /*
  //   const mockedRequests: MockedRequest[] = [
  //   {
  //     method: 'GET',
  //     url: 'http://test.de/profile',
  //     body: {},
  //   },
  //   {
  //     method: 'GET',
  //     url: 'http://test.de/profile/checkDancerNameAvailability/nameNotAvailable',
  //     body: { available: false },
  //   },
  //   {
  //     method: 'GET',
  //     url: 'http://test.de/profile/checkDancerNameAvailability/nameAvailable',
  //     body: { available: true },
  //   },
  // ];
  //
  //     spectator.typeInElement('nameNotAvailable', byTestId('username-field'));
  //     spectator.click(byTestId('submit-button'));
  //     flushRequests(httpMock, mockedRequests);
  //     spectator.detectChanges();
  //     expect(spectator.query(byTestId('username-error'))).toBeTruthy();
  //    */
  //
  it('displays a list of previous chats', () => {
    const mockedRequests = getMockedRequestsForChats(
      { partner: 'Dancer1' },
      { partner: 'Dancer2' }
    );

    flushRequests(httpMock, mockedRequests);
    spectator.detectChanges();
    // TODO: assert number of chats
  });

  it('displays previous chat messages when a chat is selected', () => {
    // setup mock requests
    const mockedChatRequests = getMockedRequestsForChats(
      { partner: 'Dancer1' },
      { partner: 'Dancer2' }
    );
    const mockedMessageRequests = getMockedRequestsForMessages('0', {
      from: 'Dancer1',
      text: 'Hello World',
    });
    flushRequests(httpMock, mockedChatRequests);
    spectator.detectChanges();

    // user selects chat with Dancer 1
    const chatWithDancer1 = byText('Dancer1');
    expect(spectator.query(chatWithDancer1)).toBeTruthy();
    spectator.click(chatWithDancer1);
    flushRequests(httpMock, mockedMessageRequests);
    spectator.detectChanges();

    // check if messages are displayed
    expect(spectator.query(byText('Hello World'))).toBeTruthy();
    spectator.fixture.destroy();
  });
  //
  //   xit('displays new messages as they arrive in selected chat', fakeAsync(() => {
  //     // setup mock requests
  //     const mockedChatRequests = getMockedRequestsForChats(
  //       { partner: 'Dancer1' },
  //       { partner: 'Dancer2' }
  //     );
  //     const mockedMessageRequests = getMockedRequestsForMessages('0', {
  //       from: 'Dancer1',
  //       text: 'Foo',
  //     });
  //     flushRequests(httpMock, mockedChatRequests);
  //     spectator.detectChanges();
  //
  //     // user selects chat with Dancer 1
  //     const chatWithDancer1 = byText('Dancer1');
  //     expect(spectator.query(chatWithDancer1)).toBeTruthy();
  //     spectator.click(chatWithDancer1);
  //     flushRequests(httpMock, mockedMessageRequests);
  //     spectator.detectChanges();
  //
  //     // check that first message is displayed
  //     expect(spectator.query(byText('Foo'))).toBeTruthy();
  //
  //     // new message arrives
  //     const newMessageRequests = getMockedRequestsForMessages('0', {
  //       from: 'Dancer1',
  //       text: 'Bar',
  //     });
  //     flushRequests(httpMock, newMessageRequests);
  //     tick(10_000);
  //     spectator.detectChanges();
  //
  //     // check that the new message is displayed
  //     expect(spectator.query(byText('Foo'))).toBeTruthy();
  //     expect(spectator.query(byText('Bar'))).toBeTruthy();
  //     jest.runOnlyPendingTimers();
  //     jest.clearAllTimers();
  //     discardPeriodicTasks();
  //   }));

  it('allows the user to send a message', () => {
    // setup mock requests
    const mockedChatRequests = getMockedRequestsForChats(
      { partner: 'Dancer1' },
      { partner: 'Dancer2' }
    );
    const mockedMessageRequests = getMockedRequestsForMessages('0');
    flushRequests(httpMock, mockedChatRequests);
    spectator.detectChanges();

    // user selects chat with Dancer 1
    const chatWithDancer1 = byText('Dancer1');
    expect(spectator.query(chatWithDancer1)).toBeTruthy();
    spectator.click(chatWithDancer1);
    flushRequests(httpMock, mockedMessageRequests);
    spectator.detectChanges();

    // user types a message and clicks on send
    spectator.typeInElement('Hello World', byRole('textbox'));
    spectator.click(byRole('button'));
    // TODO: refactors
    flushRequests(httpMock, [
      {
        method: 'POST',
        url: 'http://test.de/chats/0/messages',
        body: {},
      },
    ]);
    spectator.detectChanges();
    const newMessagesRequests = getMockedRequestsForMessages('0', {
      from: 'Dancer1',
      text: 'Hello World',
    });
    flushRequests(httpMock, newMessagesRequests);
    spectator.detectChanges();

    // check that the message is displayed
    expect(spectator.query(byText('Hello World'))).toBeTruthy();
  });
});
