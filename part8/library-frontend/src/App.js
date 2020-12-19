
import React, { useState, useEffect, Fragment } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')

  const client = useApolloClient();

  useEffect(() => {
    const tokenValue = localStorage.getItem('user')
    setToken(tokenValue)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()    
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
            <Fragment>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommended</button>
              <button onClick={() => logout()}>logout</button>
            </Fragment>
          ) : (
            <button onClick={() => setPage('login')}>login</button>
          )
        }
      </div>
       <div>
          <Authors show={page === 'authors'} token={token}/>
          <Books show={page === 'books'} />
          <NewBook show={page === 'add'} />
          <Recommend show={page === 'recommend'} />
          <Login show={page === 'login'} setToken={setToken} token={token} setPage={setPage}/>
       </div>
    </div>
  )
}

export default App