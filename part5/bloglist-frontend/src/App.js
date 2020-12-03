import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notfication from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('')
  const [messageColor, setMessageColor] = useState('')
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        username, password
      })
      console.log('user:', loggedUser)

      window.localStorage.setItem(
        'user', JSON.stringify(loggedUser)
      )

      blogService.setToken(loggedUser.token)
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch(e) {
      setMessage('Invalid username or password');
      setMessageColor('red')
      setTimeout(() => {
        setMessage(null);
      }, 5000)
    }

  }

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
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('user')
    if (savedUser) {
        const user = JSON.parse(savedUser);
        setUser(user);
        blogService.setToken(user.token)
    }
  }, [])


  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null);
  }

  return (
    <div>
      <Notfication  message={message} messageColor={messageColor}/>
    {user ? (
        <div>
          <h2>blogs</h2>
          <p>Logged in as {user.name}<button onClick={logout}>Logout</button></p>
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>          
        </div>
      )
    }    
    </div>
  )
}

export default App