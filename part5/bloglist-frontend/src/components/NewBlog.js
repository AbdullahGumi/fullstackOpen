import React, { useState } from 'react';

import blogService from '../services/blogs';

const NewBlog = ({ setMessage, setMessageColor, setNewBlogFormToggled, setNewBlogButtonText }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url
    }
    blogService.createBlog(newBlog);
    setMessage(`a new blog "${newBlog.title}" by ${newBlog.author} was added`)
    setMessageColor('green')
    setTimeout(() => setMessage(null), 5000)
    setNewBlogFormToggled(false);
    setNewBlogButtonText('New Blog');
    setAuthor('')
    setUrl('')
    setTitle('')
  }

	return (
		<div>
          <h2>Create your own blog!</h2>
          <form onSubmit={handleSubmit}>
            <div>
              title:
                <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
                <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
                <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>            
            <button type="submit">create</button>
          </form>              
		</div>
	);
}

export default NewBlog;