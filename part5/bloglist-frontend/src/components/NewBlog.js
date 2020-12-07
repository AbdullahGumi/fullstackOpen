import React, { useState } from 'react';

const NewBlog = ({ onBlogAdd }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBlogAdd({
      title,
      author,
      url
    });
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
                id='title'
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
                <input
                id='author'
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
                <input
                id='url'
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