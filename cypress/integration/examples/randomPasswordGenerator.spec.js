describe('Actions', () => {
  const apiUrl = Cypress.env('api_url');

    beforeEach('Logins',() => {
      cy.fixture('user').then((resp)=>{
        cy.login(resp.email, resp.password)
        cy.visit('/')
      })
    })

    it('Generates Random Password',()=>{
        cy.get('.btn').contains('Add Password').click()
        cy.intercept('GET',apiUrl + '/passwords/generate-random-password?minLength=8&maxLength=12').as('randomPassword')
        cy.get('.btn.pointer').contains('Generate Password').click()
        cy.wait('@randomPassword').then(resp=>{
            const rPwd = resp.response.body.password
            expect(rPwd).to.match(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8}$/)
            cy.get('input[type="password"][name="password"]').should('have.value',rPwd)
        })
    })
})  