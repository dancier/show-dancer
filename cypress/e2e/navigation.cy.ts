describe('Navigation', () => {

  beforeEach(() => {
    cy.visit('');
  });

  describe('when on mobile', () => {

    beforeEach(() => {
      cy.viewport('iphone-8');
    });

    it('navigates to the "about us" page', () => {
      cy.get('[data-test=burger-menu-opener]').click();
      // Inside burger-menu, click on a link that contains the text "About us"
      cy.get('[data-test=burger-menu]').contains('Über Uns').click();

      const aboutUsPage = cy.get('[data-test="page-about-us"]');
      aboutUsPage.should('exist');
    });

  });

  describe('when on desktop', () => {

    it('navigates to the "about us" page', () => {
      // inside desktop-nav, click on a link that contains the text "Über Uns"
      cy.get('[data-test=desktop-nav]').contains('Über Uns').click();

      const aboutUsPage = cy.get('[data-test="page-about-us"]');
      aboutUsPage.should('exist');
    });

  });

});
