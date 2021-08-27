
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