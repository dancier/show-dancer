import { DancerMapDto } from '../../src/app/chat/data-access/chat.types';

export type MockBackendFunction = Function;

export function profilePictures(): MockBackendFunction {
  return () => {
    cy.intercept('GET', '/images/**', {
      fixture: 'img/profile.png',
    });
  };
}

export type TestChatConversation = {
  partner: string;
  messages: { sentByMe: boolean; text: string }[];
};

export function chats(
  conversations: TestChatConversation[]
): MockBackendFunction {
  return () => {
    cy.intercept('GET', '/chats', {
      body: conversations.map((conversation, _) => ({
        chatId: conversation.partner,
        dancerIds: [conversation.partner, 'ownId'],
        lastActivity: null,
        type: 'DIRECT',
        lastMessage: null,
      })),
    }).as('getChats');

    cy.intercept('GET', 'chats/**/messages', (req) => {
      // context: the url is something like https://test.de/chats/1/messages
      const chatId = decodeURIComponent(req.url.split('/')[4]);
      const conversation = conversations.find((c) => c.partner === chatId);
      req.reply({
        body: {
          messages: conversation?.messages.map(
            (message, index) =>
              ({
                id: index.toString(),
                authorId: message.sentByMe ? 'ownId' : chatId,
                text: message.text,
                readByDancers: null,
                createdAt: '2023-05-01T11:35:15.195Z',
              } || [])
          ),
        },
      });
    });

    // intercept dancers request
    const dancerBody: DancerMapDto = {
      ...conversations.reduce((acc, chat) => {
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

    cy.intercept('POST', '/dancers', {
      body: dancerBody,
    });
  };
}

/*
cy.mockBackend(
  profilePictures(),
  chatConversations([
    {
      partner: 'Partner 1',
      messages: [
        { sentByMe: false, text: 'Hello' },
        { sentByMe: true, text: 'Hi' },
      ],
    },
    {
      partner: 'Partner 2',
      messages: [],
    },
  ]),
)
 */
