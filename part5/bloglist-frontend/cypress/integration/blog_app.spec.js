describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'app',
      username: 'appman',
      password: '1234567890'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)    
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
    cy.get('#username').type('appman')
    cy.get('#password').type('1234567890')
    cy.get('#login-button').click()

    cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('pacman')
    cy.get('#password').type('1234567890')
    cy.get('#login-button').click()

	cy.get('.message').should('contain', 'Invalid username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
    cy.get('#username').type('appman')
    cy.get('#password').type('1234567890')
    cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Ultimate Cypress Blog')
      cy.get('#author').type('Cypreman')
      cy.get('#url').type('https://Cypress.io')
      cy.contains('create').click()
      cy.get('.message').should('contain', 'a new blog "Ultimate Cypress Blog" by Cypreman was added')
      cy.contains('Ultimate Cypress Blog Cypreman')
    })

    it('A user can like a blog', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Ultimate Cypress Blog')
      cy.get('#author').type('Cypreman')
      cy.get('#url').type('https://Cypress.io')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.get('.liked').contains('1')

    })
  })

})
