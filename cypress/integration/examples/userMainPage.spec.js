/// <reference types="cypress" />

describe('Actions', () => {
  const apiUrl = 'http://localhost:8081/api';
  let userId;
  let userDetail;
  beforeEach('Logins',() => {
    cy.fixture('user').then((resp)=>{
      userDetail = resp;
      cy.login(resp.email, resp.password).then((data)=>{
        userId = data.id
        //always check for user id.
        cy.intercept('GET',apiUrl + `/passwords/get-passwords?user-id=${userId}`).as('password')
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
          cy.log("password length = " + response.body.passwordList.length)
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
        cy.intercept('POST',apiUrl + '/passwords/decrypt-password').as('getPassword')
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
