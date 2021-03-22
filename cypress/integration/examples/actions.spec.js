/// <reference types="cypress" />

describe('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // https://on.cypress.io/interacting-with-elements

  it('Visits login page', () => {
    cy.get('.logo img').should('be.visible')
    cy.get('.title').should('have.text','Login')
    cy.get('.form-group > .bold').contains('Email')
    cy.get('.form-group > .bold').contains('Password')
    cy.get('input[type="email"][placeholder="Enter email"]').clear().should('be.empty')
  })


})
