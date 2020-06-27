const a = Math.floor(Math.random() * Math.floor(15));

describe('SingleCharacter', () => {
  it('Une page personnage doit s\'ouvrir', () => {
    cy.visit('http://localhost:3000');
    cy.get('a').eq(a).should('have.attr', 'href').then(((href) => { cy.visit(`http://localhost:3000${href}`); }));
    cy.get('h1').should('be.visible');
  });
});
