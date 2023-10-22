import { ChatPageNewComponent } from './chat-page-new.component';

describe('The NEW Chat Page', () => {
  beforeEach(() => {
    cy.window().then((window) => {
      window['testRunnerEnvironment'] = true;
    });
    cy.viewport(400, 400);
  });

  it('shows fetched chat messages', () => {
    cy.intercept('GET', '/chats', {
      chats: [
        {
          chatId: 'chatId1',
          dancerIds: ['dancerId1', 'dancerId2'],
          lastActivity: null,
          type: 'DIRECT',
          lastMessage: null,
        },
        {
          chatId: 'chatId2',
          dancerIds: ['dancerId1', 'dancerId2'],
          lastActivity: null,
          type: 'DIRECT',
          lastMessage: null,
        },
      ],
    }).as('chats');

    cy.mount(ChatPageNewComponent);
    cy.wait('@chats');
    // TODO: only for demo
    cy.contains('chatId1').should('be.visible');
  });
});
