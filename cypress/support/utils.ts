// Get one or more DOM elements by the data-test attribute.
export const getByTestId = (testId: string): Cypress.Chainable<JQuery> => {
  return cy.get(`[data-test="${testId}"]`);
};
