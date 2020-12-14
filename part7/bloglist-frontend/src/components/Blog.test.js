// /*eslint-env es6*/;
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import NewBlog from './NewBlog'

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

test('the form calls the event handler with the right details when a new blog is created', () => {
  const onBlogAdd = jest.fn();
  // console.log(prettyDOM(onBlogAdd))
  const component = render(<NewBlog onBlogAdd={onBlogAdd}/>);
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')
  fireEvent.change(title, { 
    target: { value: 'pro coder' } 
  })
  fireEvent.change(author, { 
    target: { value: 'James Black' } 
  })
  fireEvent.change(url, { 
    target: { value: 'https://procoder.dev' } 
  })    
  fireEvent.submit(form)
  expect(onBlogAdd.mock.calls).toHaveLength(1)
  expect(onBlogAdd.mock.calls[0][0].title).toBe('pro coder')
  expect(onBlogAdd.mock.calls[0][0].author).toBe('James Black')
  expect(onBlogAdd.mock.calls[0][0].url).toBe('https://procoder.dev')
})