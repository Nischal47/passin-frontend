// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login',(email, password)=>{
    const apiUrl = Cypress.env('api_url');
    cy.request('POST', apiUrl + '/users/login', {"email":email, "password":password}).then((resp)=>{
        window.localStorage.setItem('token',resp.body.token)
        window.localStorage.setItem('refreshToken',resp.body.refreshToken)
        const users = {
            id : resp.body.user.id,
            email : resp.body.user.email,
            firstName : resp.body.user.firstName,
            lastName : resp.body.user.lastName,
            dateOfBirth : resp.body.user.dateOfBirth,
        }
        window.localStorage.setItem('user', JSON.stringify(users))
        return JSON.parse(window.localStorage.getItem('user'))
    })
})