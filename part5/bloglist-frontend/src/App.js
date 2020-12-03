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
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        username, password
      })
      console.log('user:', loggedUser)
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch(e) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
      console.log('execption', e);
    }

  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
    {user ? (
        <div>
          <h2>blogs</h2>
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