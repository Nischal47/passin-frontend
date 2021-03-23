/// <reference types="cypress" />

describe('Actions', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    // https://on.cypress.io/interacting-with-elements
  
    it('Visits login page', () => {
      cy.get('.logo img').should('be.visible')
      cy.get('input[type="email"][placeholder="Enter email"]').clear().should('have.value',"dsfsdf")
    })
  
  
  })
  