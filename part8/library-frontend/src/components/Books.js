import React, { useState } from 'react'
import { useQuery } from '@apollo/client';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [searchByGenre, setSearchByGenre] = useState('all genres')
  if (!props.show) {
    return null
  }

  const books = result.loading ? [] : result.data.allBooks
  let genres = ['all genres'];

  books.forEach(book => {
  	genres = genres.concat(book.genres)

  })
  const allGenresWithDuplicates = new Set(genres)
  const allGenres = [...allGenresWithDuplicates]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {searchByGenre  === 'all genres'? (
	      	books.map(a =>
	            <tr key={a.title}>
	              <td>{a.title}</td>
	              <td>{a.author.name}</td>
	              <td>{a.published}</td>
	            </tr>
		      )
          	) : (
	      	books.filter(book => book.genres.includes(searchByGenre)).map(book => 
	            <tr key={book.title}>
	              <td>{book.title}</td>
	              <td>{book.author.name}</td>
	              <td>{book.published}</td>
	            </tr>
	      		)          		
          	)
          }
        </tbody>
      </table>
      {
      	allGenres.map(genre => <button key={genre} onClick={() => setSearchByGenre(genre)}>{genre}</button>)
      }
    </div>
  )
}

export default Books