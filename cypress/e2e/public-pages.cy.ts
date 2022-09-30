describe('Pages that are publicly visible without login should be accessible through navigation', () => {
  it('passes', () => {
    cy.visit('https://test.dancier.net')
  })
})
