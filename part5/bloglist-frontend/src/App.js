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

  const handleBlogAddition = async (newBlog) => {
    const blog = await blogService.createBlog(newBlog);
    setBlogs([...blogs, blog]);
    setMessage(`a new blog "${newBlog.title}" by ${newBlog.author} was added`);
    setMessageColor('green');
    setTimeout(() => setMessage(null), 5000);
    setNewBlogFormToggled(false);
    setNewBlogButtonText('New Blog');    
  }

  const reRenderAfterEvent = () => {
    setBlogs([...blogs])
  }

  return (
    <div>
      <Notfication  message={message} messageColor={messageColor}/>
    {user ? (
        <div>
          <h2>blogs</h2>
          <p>Logged in as {user.name}<button onClick={logout}>Logout</button></p>
          {isNewBlogFormToggled &&
            <NewBlog onBlogAdd={handleBlogAddition}/>            
          }
          <button onClick={toggleNewBlogsForm}>{newBlogButtonText}</button>
          <div className= 'blog-list'>
            {
              blogs.map(blog =>
              <Blog key={blog.id} blog={blog} reRenderAfterEvent={reRenderAfterEvent} />
            )              
            }  
          </div>          
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
                <input
                id='username'
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
                <input
                id='password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button id='login-button' type="submit">login</button>
          </form>          
        </div>
      )
    }    
    </div>
  )
}

export default App