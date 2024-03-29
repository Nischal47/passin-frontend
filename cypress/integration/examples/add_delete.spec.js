describe('Add/Delete password',()=>{
  const apiUrl = Cypress.env('api_url');
  let user_id;
  let user_detail;

  beforeEach('Logins', () => {
    cy.fixture('user').then((resp)=>{
      user_detail = resp;
      user_id = resp.id;
      cy.login(user_detail.email, user_detail.password)
      //always check for user id.
      cy.intercept('GET',apiUrl + `/passwords/get-passwords?user-id=${user_id}`).as('password')
    })
    cy.visit('/')
  })

    it('Check for display of latest added password ', () => {
      //check for length of passwords saved
      cy.wait('@password').then(resp => {
        expect(resp.response.body).to.have.property('passwordList')
        const pwdLength = resp.response.body.passwordList.length
          //when saved password is not empty
          if (pwdLength != 0) {
            cy.log("password length = " + resp.response.body.passwordList.length)
          } 
          else {
            cy.log(resp.response.body)
            cy.log("user does not have any password.")
          }
        })
        cy.fixture('savePassword').then((pwd)=>{
          //for random password everytime, bcuz system doesnot accept same pwd when saving pwd.
          let randomString = Math.random().toString(5);
          const randomPassword = pwd.password + randomString;
          pwd.password = randomPassword;
            //add new password.
            cy.request({
              method:'POST', 
              'auth':{
                'bearer' : window.localStorage.getItem('token')
              },
              //check for user id in pwd.json
              url:apiUrl + '/passwords/save-password', failOnStatusCode: false, body: pwd
            })
          })
        //always check for user id.
        cy.reload()
        cy.wait('@password').then((resp)=>{
          expect(resp.response.body).to.have.property('passwordList');
          const pwdLength = resp.response.body.passwordList.length
          cy.log("password length = " + resp.response.body.passwordList.length)
          if(pwdLength != 0){
            //the latest added password should not be empty.
            cy.get(`.content-table > tbody > :nth-child(${pwdLength}) > :nth-child(3) `).should('not.be.empty')
          }
        else {
          cy.log('User doesnot have saved passwords.')
        }
        }) 

    })

    it('Deletes password from UI', () => {

      //check for length of passwords saved
      cy.wait('@password').should(({ request, response }) => {
        expect(response.body).to.have.property('passwordList')
        const pwdLength = response.body.passwordList.length
        cy.log("password length = " + response.body.passwordList.length)
        //when saved password is not empty
        if(pwdLength != 0){
          //delete password
          cy.get(`.content-table > tbody > :nth-child(${pwdLength}) > :nth-child(5) > .actions > .pointer`).eq(2).click()
          cy.get('input[type="password"][placeholder="Enter Original Password"]').type(user_detail.password)
          cy.intercept('POST',apiUrl + '/passwords/delete-password').as('deletePassword')
          cy.get('.buttons-area > .btn').contains('Confirm').click()
          cy.wait('@deletePassword').then((response)=>{
            expect(response.response.body.message).to.equal('Password Deleted Successfully')
          })
          //again check if saved passwords exists
          cy.wait('@password').should(({ request, response }) => {
            expect(response.body).to.have.property('passwordList');
            const pwdLength = response.body.passwordList.length
            cy.log("password length = " + response.body.passwordList.length)
            //if saved password/s exists
            if(pwdLength != 0){
              cy.get('.content-table > tbody').find('tr').should('have.length', pwdLength)
            }
            else {
              cy.log('User doesnot have saved passwords.')
            }
          })
      }
      else{
        cy.log('User doesnot have saved passwords.')
      } 
    })
  }) 
})
