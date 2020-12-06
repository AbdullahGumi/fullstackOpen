// /*eslint-env es6*/;
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
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

test('blog url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const blog = {
    title: 'Blog test',
    author: 'Blogger man',
    url: 'https://google.com',
    user: {
      id: 1234567890
    },
    likes: 2
  }
  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('view');
  fireEvent.click(button)
  const detailedBlog = component.container.querySelector('.blog-details');

  expect(detailedBlog).toBeVisible();
  expect(detailedBlog).toHaveTextContent(blog.url);
  expect(detailedBlog).toHaveTextContent(blog.likes);
})