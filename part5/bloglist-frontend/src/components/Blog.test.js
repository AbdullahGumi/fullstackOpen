// /*eslint-env es6*/;
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('initially only blog title and author are rendered ', () => {
  const blog = {
    title: 'Blog test',
    author: 'Blogger man'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const blogOverview = component.container.querySelector('.blog-overview');

  expect(blogOverview).toHaveTextContent(
    'Blog test'
  )
})