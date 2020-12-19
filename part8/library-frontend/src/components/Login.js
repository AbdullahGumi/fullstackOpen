
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries';

const Login = ({ show, setToken, token, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result] = useMutation(LOGIN);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password }})
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user', token)
      setPage('authors')
    }
  }, [result.data])
  if (!show || token) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username: <input onChange={({ target }) => setUsername(target.value)} value={username}/>
        </div>
        <div>
          password: <input onChange={({ target }) => setPassword(target.value)} value={password} />
        </div>
        <button type='submit'>submit</button>        
      </form>
    </div>
  )
}

export default Login