import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MountConfig } from 'cypress/angular';
import { CommonModule } from '@angular/common';
import { ChatPageDemoComponent } from './page/chat-page/chat-page-demo.component';
import { chats, profilePictures } from '@cypress-support/mock-backend';
import { ChatPageComponent } from './page/chat-page/chat-page.component';

// const timerMock = new TimerMockService();

const demoMountConfig: MountConfig<ChatPageDemoComponent> = {
  imports: [CommonModule, HttpClientModule],
  providers: [
    // {
    //   provide: TimerService,
    //   useValue: timerMock,
    // },
  ],
};

const defaultMountConfig: MountConfig<ChatPageComponent> = {
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
  providers: [
    {
      provide: ActivatedRoute,
      useValue: {
        params: of({}),
      },
    },
    // {
    //   provide: TimerService,
    //   useValue: timerMock,
    // },
    // {
    //   provide: IntervalSchedulerToken,
    //   useValue: new TestScheduler((a, b) => a == b),
    // },
  ],
};

describe('The chat page', () => {
  beforeEach(() => {
    cy.window().then((window) => {
      window['testRunnerEnvironment'] = true;
    });
    cy.viewport(400, 400);
  });

  // xit('mounts', () => {
  //   cy.intercept('GET', '/chats', {
  //     chats: [
  //       {
  //         chatId: 'chatId',
  //         dancerIds: ['dancerId1', 'dancerId2'],
  //         lastActivity: null,
  //         type: 'DIRECT',
  //         lastMessage: null,
  //       },
  //       {
  //         chatId: 'chatId2',
  //         dancerIds: ['dancerId1', 'dancerId2'],
  //         lastActivity: null,
  //         type: 'DIRECT',
  //         lastMessage: null,
  //       },
  //     ],
  //   }).as('chats');
  //   cy.window().then((window) => {
  //     window['testRunnerEnvironment'] = true;
  //   });
  //   cy.mount(ChatPageDemoComponent, demoMountConfig).then(() => {
  //     // cy.window().then((window) => {
  //     //   // timerMock.emit(0);
  //     //   // @ts-ignore
  //     //   const serviceFromAngularScope: ChatServiceDemoService =
  //     //     // @ts-ignore
  //     //     window['demoService'];
  //     //   console.log('serviceFromAngularScope', serviceFromAngularScope);
  //     //   serviceFromAngularScope.valueSubject.next(0);
  //     // });
  //   });
  //   // click on button
  //   // cy.get('[data-testid="emit-btn"]').click();
  //   cy.window().then((window) => {
  //     window['emitTimer']('fetch-chats');
  //   });
  //   cy.wait('@chats');
  //
  //   // should containt text 'chat-page-demo works!'
  //   cy.contains('Value from Demo: 2').should('be.visible');
  // });

  // xit('displays a list of previous chats', () => {
  //   // cy.clock();
  //   const chatResponse: TestChatConversation[] = [
  //     {
  //       partner: 'Adam Ant',
  //       messages: [],
  //     },
  //   ];
  //
  //   const chatResponse2: TestChatConversation[] = [
  //     {
  //       partner: 'Adam Ant',
  //       messages: [],
  //     },
  //     {
  //       partner: 'Bobby Brown',
  //       messages: [],
  //     },
  //   ];
  //
  //   cy.intercept('GET', '/chats', (req) => {
  //     const currentChatResponse = chatResponse;
  //     req.reply({
  //       body: {
  //         chats: currentChatResponse?.map((conversation, _) => ({
  //           chatId: conversation.partner,
  //           dancerIds: [conversation.partner, 'ownId'],
  //           lastActivity: null,
  //           type: 'DIRECT',
  //           lastMessage: null,
  //         })),
  //       },
  //     });
  //   });
  //
  //   cy.intercept('POST', '/dancers', (req) => {
  //     const currentChatResponse = chatResponse;
  //     const dancerBody: DancerMapDto = {
  //       ...currentChatResponse?.reduce((acc, chat) => {
  //         acc[chat.partner] = {
  //           id: chat.partner,
  //           dancerName: chat.partner,
  //           city: 'TestCity',
  //           profileImageHash: 'TestImageHash',
  //         };
  //         return acc;
  //       }, {} as DancerMapDto),
  //       ownId: {
  //         id: 'ownId',
  //         dancerName: 'ownName',
  //         city: 'TestCity',
  //         profileImageHash: 'TestImageHash',
  //       },
  //     };
  //     req.reply({
  //       body: dancerBody,
  //     });
  //   }).as('dancerRequest');
  //
  //   cy.mount(ChatPageComponent, defaultMountConfig).then(() => {
  //     // TODO: make the fake timer emit once here
  //     cy.wait(1000).then(() => {
  //       timerMock.emit(0);
  //       cy.wait('@dancerRequest');
  //       cy.get('[data-testid="chat-list-entry"]').as('chatListEntries');
  //
  //       cy.get('@chatListEntries').should('have.length', 1);
  //       cy.get('@chatListEntries').eq(0).should('contain.text', 'Adam Ant');
  //     });
  //   });
  //
  //
  //   // cy.tick(0);
  //
  //   // cy.wait(5000);
  //
  //   // second time fetching chats
  //   cy.intercept('GET', '/chats', (req) => {
  //     const currentChatResponse = chatResponse2;
  //     req.reply({
  //       body: {
  //         chats: currentChatResponse?.map((conversation, _) => ({
  //           chatId: conversation.partner,
  //           dancerIds: [conversation.partner, 'ownId'],
  //           lastActivity: null,
  //           type: 'DIRECT',
  //           lastMessage: null,
  //         })),
  //       },
  //     });
  //   });
  //
  //   cy.intercept('POST', '/dancers', (req) => {
  //     const currentChatResponse = chatResponse2;
  //     const dancerBody: DancerMapDto = {
  //       ...currentChatResponse?.reduce((acc, chat) => {
  //         acc[chat.partner] = {
  //           id: chat.partner,
  //           dancerName: chat.partner,
  //           city: 'TestCity',
  //           profileImageHash: 'TestImageHash',
  //         };
  //         return acc;
  //       }, {} as DancerMapDto),
  //       ownId: {
  //         id: 'ownId',
  //         dancerName: 'ownName',
  //         city: 'TestCity',
  //         profileImageHash: 'TestImageHash',
  //       },
  //     };
  //     req.reply({
  //       body: dancerBody,
  //     });
  //   })
  //     .as('dancerRequest2')
  //     .then(() => {
  //       // make the fake timer emit once here
  //       cy.wait(1000).then(() => {
  //         timerMock.emit(1);
  //       });
  //       cy.wait(1000);
  //
  //       // cy.tick(2000);
  //       cy.wait('@dancerRequest2');
  //
  //       // cy.tick(1000);
  //       // cy.wait(5000);
  //
  //       cy.get('@chatListEntries').should('have.length', 2);
  //       cy.get('@chatListEntries').eq(0).should('contain.text', 'Adam Ant');
  //       cy.get('@chatListEntries').eq(1).should('contain.text', 'Bobby Brown');
  //     });
  // });

  it('displays previous chat messages when a chat is selected', () => {
    cy.mockBackend(
      profilePictures(),
      chats([
        {
          partner: 'Adam Ant',
          messages: [
            {
              sentByMe: true,
              text: 'Hello, how are you?',
            },
            {
              sentByMe: false,
              text: 'I am fine, thanks.',
            },
          ],
        },
        {
          partner: 'Bobby Brown',
          messages: [],
        },
      ])
    );

    cy.mount(ChatPageComponent, defaultMountConfig);
    cy.contains('Adam Ant').click();
    cy.contains('Hello, how are you?').should('be.visible');
    cy.contains('I am fine, thanks.').should('be.visible');
  });
  //
  // xit('displays new messages when they arrive', () => {
  //   cy.clock();
  //   const chatState: TestChatConversation[] = [
  //     {
  //       partner: 'Adam Ant',
  //       messages: [
  //         {
  //           sentByMe: false,
  //           text: 'Hello, how are you?',
  //         },
  //       ],
  //     },
  //     {
  //       partner: 'Bobby Brown',
  //       messages: [],
  //     },
  //   ];
  //
  //   cy.mockBackend(profilePictures(), chats(chatState));
  //
  //   cy.mount(ChatPageComponent, defaultMountConfig);
  //   cy.contains('Adam Ant').click();
  //   cy.contains('Hello, how are you?').should('be.visible');
  //   const newChatState: TestChatConversation[] = [
  //     {
  //       partner: 'Adam Ant',
  //       messages: [
  //         {
  //           sentByMe: true,
  //           text: 'Hello, how are you?',
  //         },
  //         {
  //           sentByMe: false,
  //           text: 'I am fine, thanks.',
  //         },
  //       ],
  //     },
  //     {
  //       partner: 'Bobby Brown',
  //       messages: [],
  //     },
  //     {
  //       partner: 'Cindy Crawford',
  //       messages: [],
  //     },
  //   ];
  //   console.log('newChatState', newChatState);
  //   cy.mockBackend(chats(newChatState));
  //   // TODO: hier weiter, schauen wieso es nicht geht...
  //   console.log(1);
  //   cy.tick(5000);
  //   cy.wait(5000);
  //   console.log(2);
  //   cy.contains('I am fine, thanks.').should('be.visible');
  //   console.log(3);
  // });
});
