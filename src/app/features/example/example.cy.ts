import { ExampleComponent } from './example.component';
import { mount } from 'cypress/angular';

describe('ExampleComponent', () => {
  beforeEach(() => {
    mount(ExampleComponent);
    cy.clock();
  });

  it('should display correct interval after 1 and 2 seconds', () => {
    cy.tick(1000);
    cy.get('[data-test="interval-display"]').should(
      'contain',
      'Current interval: 0'
    );

    cy.tick(1000);
    cy.get('[data-test="interval-display"]').should(
      'contain',
      'Current interval: 1'
    );
  });
});
