const li = Math.floor(Math.random() * Math.floor(15));

describe('SingleCharacter', () => {
  it('Une page personnage doit s\'ouvrir', () => {
    cy.visit('http://localhost:3000');
    cy.get('li').eq(li).click();
    cy.get('h1').should('be.visible');
  });
});
