import { getByTestId } from '../support/utils';

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('');
  });

  const navbarPublicPages = [
    { name: 'Über Uns', pageId: 'page-about-us' },
    { name: 'Kontakt', pageId: 'page-contact' },
    { name: 'Mitmachen', pageId: 'page-contribute' },
  ];

  navbarPublicPages.forEach((page) => {
    it(`can navigate to "${page.name}" page on desktop and mobile`, () => {
      // desktop
      getByTestId('desktop-nav').contains(page.name).click();
      getByTestId(page.pageId).should('be.visible');

      // mobile
      cy.viewport('iphone-8');
      cy.visit('');
      getByTestId('burger-menu-opener').click();
      getByTestId('burger-menu').contains(page.name).click();
      getByTestId(page.pageId).should('be.visible');
    });
  });
});
