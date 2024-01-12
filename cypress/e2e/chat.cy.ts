describe('Chat', () => {
  beforeEach(() => {
    cy.setupRequestMocking();
    cy.login();
  });

  it('shows "no chats" hint when there are no chats', () => {
    cy.intercept('GET', '/chats', { fixture: 'chat/get-chats/0-chats.json' });
    cy.visit('/chat');
    cy.findByText(/Du hast noch keine Chats/i).should('be.visible');
  });

  describe('when prompted to open a chat with a specific user', () => {
    it('creates and opens a new chat when it doesnt exist', () => {
      let chatCreated = false;
      cy.intercept('GET', '/chats', (req) => {
        if (!chatCreated) {
          req.reply({ fixture: 'chat/get-chats/0-chats.json' });
        } else {
          req.reply({ fixture: 'chat/get-chats/1-chats.json' });
        }
      });
      cy.intercept('POST', 'https://test-dancer.dancier.net/dancers', {
        fixture: 'chat/post-dancers/all-details.json',
      });
      cy.intercept('POST', '/chats', (req) => {
        chatCreated = true;
        req.reply({ id: '1' });
      });
      cy.intercept('GET', '/chats/1/messages', []);

      cy.visit('/chat?participantId=1');
      cy.findByTestId('chat-list-selected-entry')
        .should('be.visible')
        .should('include.text', 'Username 1');
    });

    it('opens a previously created chat', () => {
      cy.intercept('GET', '/chats', { fixture: 'chat/get-chats/1-chats.json' });
      cy.intercept('GET', '/chats/1/messages', []);
      cy.intercept('POST', 'https://test-dancer.dancier.net/dancers', {
        fixture: 'chat/post-dancers/all-details.json',
      });

      cy.visit('/chat?participantId=1');
      cy.findByTestId('chat-list-selected-entry')
        .should('be.visible')
        .should('include.text', 'Username 1');
    });
  });
});
