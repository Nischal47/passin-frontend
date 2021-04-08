/// <reference types="cypress" />

describe("Signup and Login Test", () => {
    let randomString = Math.random().toString(36).substring(2);
    const email = "email_" + randomString + randomString + "@gmail.com";
    const firstName = "fName" + randomString + randomString;
    const lastName = "lName" + randomString + randomString;
    const password = "Password1";
  
    describe("UI tests", () => {
      beforeEach(() => {
        cy.log("Email: " + email);
        cy.log("Password: " + password);
        cy.visit("/signup");
      });
  
      it("Test valid signup and Login", () => {
        cy.intercept('POST','http://localhost:8081/api/users/register').as('signUp')
        cy.get('form').within(($form) => {
            cy.get('input[type="email"][name="email"][placeholder="Enter email"]').type(email)
            cy.get('input[type="text"][name="firstName"][placeholder="Enter First Name"]').type(firstName)
            cy.get('input[type="text"][name="lastName"][placeholder="Enter Last Name"]').type(lastName)
            cy.get('input[name="dateOfBirth"][placeholder="Enter Date of birth"]').type('1998-10-25')
            cy.get('input[type="password"][name="password"][placeholder="Enter Password"]').type(password)
            cy.get('input[type="password"][name="conformPassword"]').type(password)
            cy.root().submit()
        })
        cy.wait('@signUp')
        cy.reload()
        cy.get('form').within(($form)=>{
            cy.get('input[type="email"]').type(email)
            cy.get('input[type="password"]').type(password)
            cy.get('.btn').click()
        })
        cy.get('.logo').should('be.visible')

      });
    })
})