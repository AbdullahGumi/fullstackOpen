import React from 'react';

const NewBlog = ({ handleSubmit, title, setTitle, author, setAuthor, url, setUrl, blogs }) => {
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