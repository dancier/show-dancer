describe('Pages that are publicly visible without login should be accessible through navigation', () => {
  it('passes', () => {
    cy.visit('https://test.dancier.net');
  })

  it('can navigate to the "about us" page', () => {
    cy.get('[data-test="nav-about-us"]').click();
    const aboutUsPage = cy.get('[data-test="page-about-us"]');
    aboutUsPage.should('exist');
  });
})
