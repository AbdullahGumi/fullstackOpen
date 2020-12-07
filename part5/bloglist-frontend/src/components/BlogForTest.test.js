import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForTest from './BlogForTest';

test('if the like button is clicked twice, then the event handler is called twice.', () => {
  const blog = {
    title: 'Ultimate React Blog',
    author: 'Yihua Zhang',
    likes: 59
  };

  const mockHandler = jest.fn();
  const component = render(<BlogForTest blog={blog} onClick={mockHandler} />);
  const button = component.container.querySelector('.blog-like-button');

  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
