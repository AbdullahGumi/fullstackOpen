import React from 'react';

const Users = ({ users }) => (
	<div>
		<table>		
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
						<td>{user.name}</td>
						<td>{user.blogs.length}</td>
					</tr>
				</tbody>
				)
			})
		}
		</table>
	</div>
)

export default Users;