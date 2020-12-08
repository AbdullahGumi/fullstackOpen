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
    cy.login({ username: 'appman', password: '1234567890' })

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

	it('user who created a blog can delete it', function() {
		cy.createBlog({ title: 'Blog it', author: 'mack lam', url: 'https://google.com' })
		cy.contains('view').click()
		cy.contains('Remove').click()

	})

	it('blogs are ordered from highest likes to lowest', function() {

		cy.createBlog({ title: 'Blog it', author: 'mack lam', url: 'https://google.com', likes: 20 })
		cy.createBlog({ title: 'Bloggin master', author: 'jack lam', url: 'https://google.com', likes: 18 })
		cy.createBlog({ title: 'PRO BLOGGER', author: 'lam lam', url: 'https://google.com', likes: 12 })
		cy.createBlog({ title: 'Ultimate Blogger', author: 'sir lam', url: 'https://google.com', likes: 699 })

		cy.get('.blog-list').children().eq(0).as('1stBlog')
		cy.get('.blog-list').children().eq(1).as('2ndBlog')
		cy.get('.blog-list').children().eq(2).as('3rdBlog')
		cy.get('.blog-list').children().eq(3).as('4thBlog')

		cy.get('@1stBlog').contains('view').click()
		cy.get('@2ndBlog').contains('view').click()
		cy.get('@3rdBlog').contains('view').click()
		cy.get('@4thBlog').contains('view').click()

		cy.get('@1stBlog').contains('699')
		cy.get('@2ndBlog').contains('20')
		cy.get('@3rdBlog').contains('18')
		cy.get('@4thBlog').contains('12')

	})

  })

})
