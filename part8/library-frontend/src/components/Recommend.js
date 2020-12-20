
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client'
import { USER, ALL_BOOKS_BY_GENRE } from '../queries';

const Recommend = ({ show, token }) => {
	const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS_BY_GENRE);
    const [getUser, userResult] = useLazyQuery(USER, {
        onCompleted: (data) => {
            getBooks({
                variables: { genre: data.me.favoriteGenre}
            })
        }
    });
    
  const books = !booksResult.data ? [] : booksResult.data.allBooks
  const userFavGenre = !userResult.data ? [] : userResult.data.me.favoriteGenre
  useEffect(() => {
    if (token) {
        getUser()
    }
  }, [getUser, token])

	if (!show) {
		return null
	}

  return (
    <div>
    	<h2>recommendations</h2>
    	<span>books in your favorite genre {<b>{userFavGenre}</b>}</span>
    	<table>
    		<tbody>
    			<tr>
	    			<th></th>
	    			<th>author</th>
	    			<th>published</th>
    			</tr>
    			{books.filter(book => book.genres.includes(userFavGenre)).map(book => 
    				<tr key={book.title}>
    					<td>{book.title}</td>	
    					<td>{book.author.name}</td>	
    					<td>{book.published}</td>	
    				</tr>
    				)
    			}
    		</tbody>
    	</table>
    </div>
  )
}

export default Recommend