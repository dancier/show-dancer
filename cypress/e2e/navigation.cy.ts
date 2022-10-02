import { getByTestId } from '../support/utils';

describe('Navigation', () => {

  beforeEach(() => {
    cy.visit('');
  });

  describe('when on mobile', () => {

    beforeEach(() => {
      cy.viewport('iphone-8');
    });

    it('navigates to the "about us" page', () => {
      getByTestId('burger-menu-opener').click();
      getByTestId('burger-menu').contains('Über Uns').click();

      const aboutUsPage = getByTestId('page-about-us');
      aboutUsPage.should('exist');
    });
  });

  describe('when on desktop', () => {

    it('navigates to the "about us" page', () => {
      getByTestId('desktop-nav').contains('Über Uns').click();

      const aboutUsPage = getByTestId('page-about-us');
      aboutUsPage.should('exist');
    });
  });

});
