// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Set the Cypress theme according to the system theme
// @ts-ignore
import setLightTheme from 'cypress-light-theme';
// Import commands.js using ES2015 syntax:
import './commands';

setLightTheme();

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      setupRequestMocking(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  window.localStorage.setItem(
    'authData',
    JSON.stringify({
      jwt: '',
      isLoggedIn: true,
      isHuman: true,
    })
  );

  cy.intercept('GET', '/profile', {
    fixture: 'chat/get-profile/full-profile.json',
  });
});

Cypress.Commands.add('setupRequestMocking', () => {
  cy.intercept('POST', '/eventlog', {});
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
