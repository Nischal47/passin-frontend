/// <reference types="cypress" />

describe('Tasks', () => {

  it('No param', () => {
    cy.task("noParam").then((res)=>{
      console.log(res)
    })
  })

  it('Connects database', () => {
    cy.task("getDBDataAsync").then((res)=>{
      cy.log(res)
      expect(0).to.equal(0)
    })
  })

  it.only('Counts Number of credentials stored', () => {
    cy.login()
    const user_id = 2
    const query = `select count(password) from passwords where user_id=${user_id}`;
    cy.intercept('GET',`http://localhost:8080/api/passwords/get-passwords?user-id=${user_id}`).as('savedPasswords')
    cy.visit('/')
    cy.wait('@savedPasswords').then((resp)=>{
      const pwdLength = resp.response.body.passwordList.length
      cy.task("dbQuery", query).then((res)=>{
        const dbResCount = parseInt(res.rows[0].count)
        expect(dbResCount).to.equal(pwdLength)
      })
    })
  })
})
