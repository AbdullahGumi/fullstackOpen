
import React from 'react';
import { useQuery } from '@apollo/client'
import { USER, ALL_BOOKS } from '../queries';

const Login = ({ show }) => {
	const userResult = useQuery(USER);
	const booksResult = useQuery(ALL_BOOKS);

  const books = booksResult.loading ? [] : booksResult.data.allBooks
  const userFavGenre = userResult.loading ? [] : userResult.data.me.favoriteGenre

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

export default Login