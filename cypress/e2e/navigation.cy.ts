import { getByTestId } from '../support/utils';

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('');
  });

  const navbarPublicPages = [
    { name: 'Über Uns', pageId: 'page-about-us' },
    { name: 'Kontakt', pageId: 'page-contact' },
    // { name: 'Mitmachen', pageId: 'page-contribute' },
  ];

  describe('when on mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-8');
    });

    navbarPublicPages.forEach((page) => {
      it(`can navigate to "${page.name}" page`, () => {
        getByTestId('burger-menu-opener').click();
        getByTestId('burger-menu').contains(page.name).click();

        getByTestId(page.pageId).should('be.visible');
      });
    });
  });

  describe('when on desktop', () => {
    navbarPublicPages.forEach((page) => {
      it(`can navigate to "${page.name}" page`, () => {
        getByTestId('desktop-nav').contains(page.name).click();

        getByTestId(page.pageId).should('be.visible');
      });
    });
  });
});
