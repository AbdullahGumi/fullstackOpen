import React from 'react';
import { Table } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Users = ({ users }) => (
	<div>
		<Table bordered variant='success'>	
			<tbody>
				<tr>
					<th>Users</th>
					<th>blogs created</th>
				</tr>
			</tbody>
		{users && 
			users.map(user => {
				return (
				<tbody key={user.id}>
					<tr>
						<td>
							<Link to={`users/${user.id}`}>{user.name}</Link>
						</td>
						<td>{user.blogs.length}</td>
					</tr>
				</tbody>
				)
			})
		}
		</Table>
	</div>
)

export default Users;