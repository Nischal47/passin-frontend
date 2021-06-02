/// <reference types="cypress" />

describe('Actions', () => {
    beforeEach('Logins',() => {
      cy.login()

      //always check for user id.
      cy.intercept('GET','http://localhost:8080/api/passwords/get-passwords?user-id=3').as('password')
    })
    
    it('Visits login page', () => {
      
        cy.visit('/dashboard')
        cy.get('.toaster-title').should('be.visible').should('have.text','Login Success')
      cy.get('.user-name > .sub-title').should('have.text','Nischal Babu Bohara')
      cy.get('.logo').should('be.visible')
    })

    it('xhr test: Check GET password response.', () => {
        cy.visit('/dashboard')
        cy.wait('@password')
            .should(({ request, response }) => {
                // expect(request.url).to.match('/\/user$/')        // regex aayena
                expect(request.method).to.equal('GET')
                expect(response.body).to.have.property('passwordList')
                // expect(response.body.passwordList).to.have.lengthOf(3)
                cy.log(response.body.passwordList)
        })
    
    })
  
    it('Check for display of latest added password ', () => {
      cy.visit('/')
      cy.fixture('pwd').then((pwd)=>{
        //add new password.
        cy.request({method:'POST', 'auth':{
          'bearer' : window.localStorage.getItem('token')
        },
        //check for user id in pwd.json
        url:'http://localhost:8080/api/passwords/save-password', failOnStatusCode: false, body: pwd})
      })
      cy.reload()
      cy.wait('@password').then((resp)=>{
        expect(resp.response.body).to.have.property('passwordList');
        const {
          passwordList
        } = resp.response.body.passwordList.length;
        const pwdLength = resp.response.body.passwordList.length
        cy.log(resp.response.body.passwordList.length)
        if(pwdLength != 0){
          //the latest added password should not be empty.
          cy.get(`.content-table > tbody > :nth-child(${pwdLength}) > :nth-child(3) `).should('not.be.empty')
        }
      }) 
    })

    it('decrypt password',()=>{
      cy.visit('/')
      //CHECK IF added password is decrypted or not.
      cy.wait('@password').then((resp)=>{
        const pwdLength = resp.response.body.passwordList.length

        cy.get(`:nth-child(${pwdLength}) > :nth-child(5) > .actions > .pointer`).eq(1).click()
              cy.get('input[name="originalPassword"][type="password"]').type('qqqqqqqq')
            cy.intercept('POST','http://localhost:8080/api/passwords/decrypt-password').as('getPassword')
            cy.get('.button-area > .btn').contains('Confirm').click()
            cy.wait('@getPassword').then((resp)=>{
              cy.get(`.content-table > tbody > :nth-child(${pwdLength}) > :nth-child(3) `).should('have.text',resp.response.body.decryptedPassword.password)
            })
      })
      
      
    })
  
})
  