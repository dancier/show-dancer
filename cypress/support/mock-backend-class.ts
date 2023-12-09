import { TestChatConversation } from './mock-backend';
import { DancerMapDto } from '../../src/app/chat/data-access/chat.types';

export class MockedBackend {
  mockedChats: TestChatConversation[] = [];

  public initMock(): void {
    cy.intercept('GET', '/chats', (req) => {
      req.reply({
        body: {
          chats: this.mockedChats.map((conversation, _) => ({
            chatId: conversation.partner,
            dancerIds: [conversation.partner, 'ownId'],
            lastActivity: null,
            type: 'DIRECT',
            lastMessage: null,
          })),
        },
      });
    }).as('getChats');

    // intercept dancers request
    cy.intercept('POST', '/dancers', (req) => {
      const dancerBody: DancerMapDto = {
        ...this.mockedChats.reduce((acc, chat) => {
          acc[chat.partner] = {
            id: chat.partner,
            dancerName: chat.partner,
            city: 'TestCity',
            profileImageHash: 'TestImageHash',
          };
          return acc;
        }, {} as DancerMapDto),
        ownId: {
          id: 'ownId',
          dancerName: 'ownName',
          city: 'TestCity',
          profileImageHash: 'TestImageHash',
        },
      };

      req.reply({
        body: dancerBody,
      });
    }).as('getDancers');
  }
}
