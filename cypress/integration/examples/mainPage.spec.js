/// <reference types="cypress" />

describe('Actions', () => {
    beforeEach('Logins',() => {
      cy.login()

      cy.intercept('GET','http://localhost:8081/api/passwords/get-passwords?user-id=2').as('password')
    })
    
    it('Visits login page', () => {
      
        cy.visit('/dashboard')
        cy.get('.toaster-title').should('be.visible').should('have.text','Login Success')
      cy.get('.user-name > .sub-title').should('have.text','Nischal Babu Bohara')
      cy.get('.logo').should('be.visible')
    })

    it('get user id', () => {

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
  
    it.only('get user id', () => {
      cy.visit('/')
      cy.fixture('pwd').then((pwd)=>{
        cy.request({method:'POST', 'auth':{
          'bearer' : window.localStorage.getItem('token')
        },
        url:'http://localhost:8081/api/passwords/save-password', failOnStatusCode: false, body: pwd})
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
          cy.get(`.content-table > tbody > :nth-child(${pwdLength}) > :nth-child(3)`).should('not.be.empty')
        }
      })
    })

  
})
  