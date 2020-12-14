import React, { useState, useEffect } from 'react';
import NewBlog from './components/NewBlog';
import Blog from './components/Blog';
import Users from './components/Users';

import Notfication from './components/Notification';
import { setNotification } from './reducers/notificationReducer';
import { setUsername, setUser, setPassword } from './reducers/userReducer';
import { createNewBlog, initializeBlogs } from './reducers/blogsReducer';

import { useDispatch, useSelector } from 'react-redux';
import {Switch, Link, Route} from 'react-router-dom';

import blogService from './services/blogs';
import loginService from './services/login';
import userService from './services/users';


const App = () => {
  const dispatch = useDispatch();

  const username = useSelector(state => state.user.username)
  const password = useSelector(state => state.user.password)
  const user = useSelector(state => state.user.user)
  
  const blogs = useSelector(state => state.blogs.blogs)

  const [isNewBlogFormToggled, setNewBlogFormToggled ] = useState(false);
  const [newBlogButtonText, setNewBlogButtonText ] = useState('New blog');
  const [users, setUsers ] = useState([]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'user', JSON.stringify(loggedUser)
      )

      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser));
      dispatch(setUsername(''));
      dispatch(setPassword(''));
    } catch(e) {
      dispatch(setNotification('Invalid username or password', 'red', 5))
    }

  }



  useEffect(() => {
      dispatch(initializeBlogs())
      userService.getAll().then(allUsers => setUsers(allUsers));
      
  }, [])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('user')
    if (savedUser) {
        const user = JSON.parse(savedUser);
        dispatch(setUser(user));
        blogService.setToken(user.token)
    }
  }, [])


  const logout = () => {
    window.localStorage.removeItem('user')
    dispatch(setUser(null));
  }

  const toggleNewBlogsForm = () => {
    setNewBlogFormToggled(!isNewBlogFormToggled);
    isNewBlogFormToggled ? setNewBlogButtonText('New Blog') : setNewBlogButtonText('cancel')
  }

  const handleBlogAddition = async (newBlog) => {
    dispatch(createNewBlog(newBlog));
    dispatch(setNotification(`a new blog "${newBlog.title}" by ${newBlog.author} was added`, 'green', 5))
    setNewBlogFormToggled(false);
    setNewBlogButtonText('New Blog');    
  }

  return (
    <div>
      <Notfication/>
    {user ? (
        <div>
          <Link to ='/users'>View all users</Link>
          <Switch>
            <Route path='/users'>
              <Users users={users}/>
            </Route>
            <Route exact path='/'>
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
                      <Blog key={blog.id} blog={blog}/>
                    )              
                    }  
                  </div>            
                </div>          
            </Route>
          </Switch>
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
                onChange={({ target }) => dispatch(setUsername(target.value))}
              />
            </div>
            <div>
              password
                <input
                id='password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => dispatch(setPassword(target.value))}
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