import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';

const User = ({ users }) => {
    const id = useParams().id;
    const sameUser = users.find(user => user.id === id);
	return (
		<Card style={{ width: '50rem' }}>
			<Card.Header>{sameUser && sameUser.name}</Card.Header>
			<Card.Title>Added blogs</Card.Title>
			<ListGroup variant="flush">
				{sameUser &&
					sameUser.blogs.map(blog => <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)
				}				
			</ListGroup>

		</Card>
	);
}

export default User;