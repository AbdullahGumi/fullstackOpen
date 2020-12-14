import React from 'react';
import { useParams } from 'react-router-dom';

const User = ({ users }) => {
    const id = useParams().id;
    const sameUser = users.find(user => user.id === id);
	return (
		<div>
			<h2>{sameUser && sameUser.name}</h2>
			<h3>Added blogs</h3>
			{sameUser &&
				sameUser.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
			}
		</div>
	);
}

export default User;