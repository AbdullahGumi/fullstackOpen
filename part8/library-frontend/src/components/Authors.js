  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [ updateAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });
  const [name, setName] = useState('')
  const [setBornTo, setBirthyear] = useState('')
  if (!props.show) {
    return null
  }
  const authors = result.loading ? [] : result.data.allAuthors;

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAuthor({ variables: { name, setBornTo: Number(setBornTo) } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
        <form onSubmit={handleSubmit}>
        <div>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <input
            value={setBornTo}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>        
        <button type='submit'>update author</button>
        </form>
    </div>
  )
}

export default Authors
