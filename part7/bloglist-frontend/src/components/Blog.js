import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

import Comments from './Comments';

import blogService from '../services/blogs';


const Blog = ({ blogs}) => {
const id = useParams().id;
const sameBlog = blogs.find(blog => blog.id === id);
const [mainUser, setMainUser] = useState([]);

  useEffect(() => {
    const savedUser = window.localStorage.getItem('user')
    if (savedUser) {
        const user = JSON.parse(savedUser);
        setMainUser(user);
        blogService.setToken(user.token)
    }
  }, [])

const handleLike = (id, blog) => {
	const updatedBlog = {
		user: blog.user.id,
		likes: ++ blog.likes,
		author: blog.author,
		title: blog.title,
		url: blog.url
	}

	blogService.likeBlog(id, updatedBlog)

}

const handleDelete = (blog) => {
	window.confirm(`Do you want to remove blog ${blog.title} by ${blog.author} ?`)
			&& blogService.deleteBlog(blog.id)
	
}

	return (
	  <div className='blog'>
		  {sameBlog &&
			  <Card className='blog-details'>
			    <Card.Header>{sameBlog.title}</Card.Header>
			    <Card.Body>
				    <a href={`${sameBlog.url}`}>{sameBlog.url}</a>
				    <Card.Text className='liked'>{sameBlog.likes} likes <Button variant="outline-success" size='sm' onClick={()=> handleLike(sameBlog.id, sameBlog)}>like</Button></Card.Text>
				    <Card.Text>added by {sameBlog.author}</Card.Text>
				    {mainUser.id === sameBlog.user.id &&
						<Button variant="outline-success" size='sm' onClick={() => handleDelete(sameBlog)}>Remove</Button>
				    }
				    <Comments sameBlog={sameBlog}/>
			    </Card.Body>
			  </Card>		  	
		  }
	  </div>
	);
}

export default Blog;