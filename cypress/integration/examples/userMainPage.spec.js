/// <reference types="cypress" />

describe('Actions', () => {
  let userId;
  let userDetail;
  beforeEach('Logins',() => {
    cy.fixture('user').then((resp)=>{
      userDetail = resp;
      cy.login(resp.email, resp.password).then((data)=>{
        userId = data.id
        //always check for user id.
        cy.intercept('GET',`http://localhost:8080/api/passwords/get-passwords?user-id=${userId}`).as('password')
      })
      cy.visit('/')
    })
  })

  it('xhr test: Check GET password response.', () => {
    cy.log(userId)
    cy.wait('@password')
        .should(({ request, response }) => {
            // expect(request.url).to.match('/\/user$/')        // regex aayena
            expect(request.method).to.equal('GET')
            expect(response.body).to.have.property('passwordList')
            // expect(response.body.passwordList).to.have.lengthOf(3)
            cy.log(response.body.passwordList)
    })
  })

  it('decrypt last/bottom password',()=>{

    //CHECK IF added password is decrypted or not.
    cy.wait('@password').then((resp)=>{
      const pwdLength = resp.response.body.passwordList.length
      if(pwdLength != 0){
        //click on decrypt password button icon
        cy.get(`:nth-child(${pwdLength}) > :nth-child(5) > .actions > .pointer`).eq(1).click()
        cy.get('input[name="originalPassword"][type="password"]').type(userDetail.password)
        cy.intercept('POST','http://localhost:8080/api/passwords/decrypt-password').as('getPassword')
        cy.get('.button-area > .btn').contains('Confirm').click()
        cy.wait('@getPassword').then((resp)=>{
          cy.get(`.content-table > tbody > :nth-child(${pwdLength}) > :nth-child(3) `).should('have.text',resp.response.body.decryptedPassword.password)
        })
      }
      else {
        cy.log('User doesnot have saved passwords.')
      }
    })
  })
})
  
describe('Add password',()=>{
  let userId;
  beforeEach('Logins',() => {
    cy.fixture('user').then((resp)=>{
      cy.login(resp.email, resp.password).then((data)=>{
        userId = data.id
      })
    })
  })
  it('Check for display of latest added password ', () => {
    cy.visit('/')
    cy.fixture('pwd').then((pwd)=>{
      //add new password.
      cy.request({
        method:'POST', 
        'auth':{
        'bearer' : window.localStorage.getItem('token')
        },
        //check for user id in pwd.json
        url:'http://localhost:8080/api/passwords/save-password', failOnStatusCode: false, body: pwd
      })
    })
    //always check for user id.
    cy.intercept('GET',`http://localhost:8080/api/passwords/get-passwords?user-id=${userId}`).as('password')
    cy.reload()
    cy.wait('@password').then((resp)=>{
      expect(resp.response.body).to.have.property('passwordList');
      const pwdLength = resp.response.body.passwordList.length
      cy.log(resp.response.body.passwordList.length)
      if(pwdLength != 0){
        //the latest added password should not be empty.
        cy.get(`.content-table > tbody > :nth-child(${pwdLength}) > :nth-child(3) `).should('not.be.empty')
      }
    }) 
  })
})