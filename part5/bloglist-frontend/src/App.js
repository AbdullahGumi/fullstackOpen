import React, { useState, useEffect } from 'react';
import NewBlog from './components/NewBlog';
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
  const [isNewBlogFormToggled, setNewBlogFormToggled ] = useState(false);
  const [newBlogButtonText, setNewBlogButtonText ] = useState('New blog');

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
    setNewBlogFormToggled(false);
    setNewBlogButtonText('New Blog');
    setAuthor('')
    setUrl('')
    setTitle('')
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

  const toggleNewBlogsForm = () => {
    setNewBlogFormToggled(!isNewBlogFormToggled);
    isNewBlogFormToggled ? setNewBlogButtonText('New Blog') : setNewBlogButtonText('cancel')
  }

  return (
    <div>
      <Notfication  message={message} messageColor={messageColor}/>
    {user ? (
        <div>
          <h2>blogs</h2>
          <p>Logged in as {user.name}<button onClick={logout}>Logout</button></p>
          {isNewBlogFormToggled &&
            <NewBlog 
              handleSubmit={handleSubmit} 
              title={title} 
              setTitle={setTitle} 
              author={author} 
              setAuthor={setAuthor} 
              url={url} 
              setUrl={setUrl} 
              blogs={blogs} 
            />            
          }
          <button onClick={toggleNewBlogsForm}>{newBlogButtonText}</button>
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