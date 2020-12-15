import React, { useState, useEffect } from 'react';
import NewBlog from './components/NewBlog';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';
import Navigation from './components/Navigation';

import Notfication from './components/Notification';
import { setNotification } from './reducers/notificationReducer';
import { setUsername, setUser, setPassword } from './reducers/userReducer';
import { createNewBlog, initializeBlogs } from './reducers/blogsReducer';

import { useDispatch, useSelector } from 'react-redux';
import { Switch, Link, Route } from 'react-router-dom';
import { Table, Form, Button } from 'react-bootstrap';

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
      dispatch(setNotification('Invalid username or password', 'danger', 5))
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
    dispatch(setNotification(`a new blog "${newBlog.title}" by ${newBlog.author} was added`, 'success', 5))
    setNewBlogFormToggled(false);
    setNewBlogButtonText('New Blog');    
  }

  return (
    <div className="container">
      <Notfication/>
      <Navigation user={user} logout={logout}/>
    {user ? (
        <div>
          <h2>Blogs App</h2>
          <Switch>
            <Route path='/users/:id'>
              <User users={users}/>
            </Route>          
            <Route path='/users'>
              <Users  users={users}/>
            </Route>          
            <Route path='/blogs/:id'>
              <Blog  blogs={blogs}/>
            </Route>
            <Route exact path='/'>
                <div>
                  {isNewBlogFormToggled &&
                    <NewBlog onBlogAdd={handleBlogAddition}/>            
                  }
                  <Button variant="outline-success" size='sm' onClick={toggleNewBlogsForm}>{newBlogButtonText}</Button>
                  <Table variant='success' hover striped className= 'blog-list'>
                    <tbody>
                      {
                        blogs.map(blog =>
                        <tr key={blog.id} ><td><Link to ={`/blogs/${blog.id}`}>{blog.title}</Link></td></tr>
                      )              
                      }                       
                    </tbody> 
                  </Table>            
                </div>          
            </Route>
          </Switch>
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => dispatch(setUsername(target.value))}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => dispatch(setPassword(target.value))}            
            />
            <Button id='login-button' variant="outline-success" size='sm' type="submit">
              login
            </Button>
          </Form.Group>
          </form>          
        </div>
      )
    }    
    </div>
  )
}

export default App