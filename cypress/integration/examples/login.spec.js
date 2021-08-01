/// <reference types="cypress" />


describe('Login Using Email', () =>{
    const apiUrl = Cypress.env('api_url');
    const wrongPassword = 'qqqqqq'
    let email, password, firstName;
    before(()=>{
        cy.fixture('user').then((data)=>{
            email = data.email
            password = data.password
            firstName = data.firstName
        })
    })

    beforeEach('Visits Login Page',() => {
        cy.visit('/');   
    })

    it('can fill the form', ()=>{
        cy.get('input[type="email"][name="email"]').type(email)
            .should('have.value',email).clear()
            .should('have.value','');
        cy.get('input[type="password"][name="password"]').type(password)
        cy.get('button[type="submit"]')
            .contains('Login')
    })

    it('requires both email and password',()=>{
        cy.get('button[type="submit"]').click()
        cy.get('.error-text').eq(0).should('have.text','Email cannot be empty. Invalid Email.');
        cy.get('.error-text').eq(1).should('have.text','Password cannot be empty.Password should be more than 8 characters.')
    })

    it('requires email',()=>{
        cy.get('input[type="password"][name="password"]').type(password)
        cy.get('button[type="submit"]').click()
        cy.get('.error-text').should('have.text','Email cannot be empty. Invalid Email.');
    })

    it('requires password',()=>{
        cy.get('input[type="email"][name="email"]').type(email)
        cy.get('button[type="submit"]').click()
        cy.get('.error-text').should('have.text','Password cannot be empty.Password should be more than 8 characters.')
    })

    it('requires password greater than 8',()=>{
        cy.get('input[type="email"][name="email"]').type(email)
        cy.get('input[type="password"][name="password"]').type('qqqq')
        cy.get('button[type="submit"]').click()
        cy.get('.error-text').should('have.text','Password should be more than 8 characters.')
    })

    it.skip('shows email or password invalid.',()=>{
        cy.get('input[type="email"][name="email"]').type(email)
        cy.get('input[type="password"][name="password"]').type(wrongPassword)
        cy.get('button[type="submit"]').click()
        cy.get('.error-text').should('have.text','Password should be more than 8 characters.')
    })

    describe('Email Validation', () =>{
        const invalidEmail1 = 'asdfghh'
        const invalidEmail2 = 'asdfghh@'
        const invalidEmail3 = 'asdfghh@sdfsdf'

        it('requires valid email for email format: ' + invalidEmail1,()=>{
             //first case email with no @ in email
            cy.get('input[type="email"][name="email"]').clear().type(invalidEmail1)
            cy.get('button[type="submit"]').click()
            cy.get('input[type="email"]').then(($input) => {
                expect($input[0].validationMessage).to.eq(`Please include an '@' in the email address. '${invalidEmail1}' is missing an '@'.`)
            })
            cy.get('.error-text').eq(0).click().should('have.text',' Invalid Email.');
        })

        it('requires valid email for email format: '+ invalidEmail2,()=>{
            //second case email with email@ only.
            cy.reload()
            cy.get('input[type="email"][name="email"]').clear().type(invalidEmail2)
            cy.get('button[type="submit"]').click()
            cy.get('input[type="email"]').then(($input) => {
                expect($input[0].validationMessage).to.eq(`Please enter a part following '@'. '${invalidEmail2}' is incomplete.`)
            })
            cy.get('.error-text').eq(0).click().should('have.text',' Invalid Email.');
        })

        it('requires valid email for email format: '+ invalidEmail3,()=>{
            //third case with no '.com'
            cy.reload()
            cy.get('input[type="email"][name="email"]').clear().type(invalidEmail3)
            cy.get('button[type="submit"]').click()
            cy.get('.error-text').eq(0).should('have.text',' Invalid Email.');
        })
    })

    it('navigates to homepage on successful login',()=>{
        cy.get('input[type="email"][name="email"]').type(email)
        cy.get('input[type="password"][name="password"]').type(password)
        cy.intercept('POST',apiUrl + '/users/login').as('login')
        cy.get('button[type="submit"]').click()
        cy.wait('@login')
        cy.get('.user-name > .sub-title').contains(firstName).should('be.visible')
    })

})