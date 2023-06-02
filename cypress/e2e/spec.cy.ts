describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('addNote', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="titre-input"]').type('maths');
    cy.get('[data-testid="note-input"]').clear();
    cy.get('[data-testid="note-input"]').type('11');
    cy.get('[data-testid="commentaire-input"]').clear();
    cy.get('[data-testid="commentaire-input"]').type('bof');
    cy.get('.submit-btn').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('add/delete note', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="titre-input"]').type('maths');
    cy.get('[data-testid="note-input"]').type('20');
    cy.get('[data-testid="commentaire-input"]').type('Très bien');
    cy.get('.submit-btn').click();
    cy.get('[data-testid="delete-icon"] > path').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('add/update/delete note', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="titre-input"]').type('maths');
    cy.get('[data-testid="note-input"]').type('11');
    cy.get('[data-testid="commentaire-input"]').type('bien');
    cy.get('.submit-btn').click();
    cy.get('[data-testid="titre-input"]').type('Francais');
    cy.get('[data-testid="note-input"]').type('5');
    cy.get('[data-testid="commentaire-input"]').type('Moyen');
    cy.get('.submit-btn').click();
    cy.get('[style="background-color: yellow;"] > :nth-child(4) > [data-testid="edit-icon"]').click();
    cy.get('.modal-body > [data-testid="contact-form"] > :nth-child(2) > [data-testid="note-input"]').type('13');
    cy.get('.modal-body > [data-testid="contact-form"] > :nth-child(4) > .submit-btn').click();
    cy.get('[style="background-color: red;"] > :nth-child(5) > [data-testid="delete-icon"] > path').click();
    /* ==== End Cypress Studio ==== */
  });
})