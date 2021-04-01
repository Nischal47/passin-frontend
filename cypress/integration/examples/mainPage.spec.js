/// <reference types="cypress" />

describe('Actions', () => {
    beforeEach('Logins',() => {
      cy.login()
    })
    
    it('Visits login page', () => {
        cy.visit('/dashboard')
        cy.get('.toaster-title').should('be.visible').should('have.text','Login Success')
      cy.get('.user-name > .sub-title').should('have.text','Nischal Babu Bohara')
      cy.get('.logo').should('be.visible')
      
    })
  
  
})
  