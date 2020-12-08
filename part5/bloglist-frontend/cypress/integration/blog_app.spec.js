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

	cy.get('.error').should('contain', 'Invalid username or password')
    })
  })  
})
