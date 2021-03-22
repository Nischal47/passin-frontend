/// <reference types="cypress" />

describe('Actions', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    // https://on.cypress.io/interacting-with-elements
  
    it('Visits login page', () => {
      cy.request({
        method: 'POST',
        url: 'hhttp://localhost:8080/api/v1/auth/login',
        body:{
            "email" : "nischalbohara77@gmail.com",
            "password" : "Kiodaija123"
        }
      }).then((resp) =>{
        const auth_token = {
            client_id : resp.body.tokenDetails.client_id,
            created_at : resp.body.tokenDetails.created_at,
            expires_at : resp.body.tokenDetails.expires_at,
            id : resp.body.tokenDetails.id,
            token : resp.body.token
        }
        window.localStorage.setItem('token', JSON.stringify(auth_token))
      })
    })
  
  
  })
  