import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


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
	  <div style={blogStyle} className='blog'>
		  {sameBlog &&
			  <div className='blog-details'>
			    <h1>{sameBlog.title}</h1>
			    <a href={`${sameBlog.url}`}>{sameBlog.url}</a>
			    <p className='liked'>{sameBlog.likes} likes <button onClick={()=> handleLike(sameBlog.id, sameBlog)}>like</button></p>
			    <p>added by {sameBlog.author}</p>
			    {mainUser.id === sameBlog.user.id &&
					<button onClick={() => handleDelete(sameBlog)}>Remove</button>
			    }
			    <Comments sameBlog={sameBlog}/>
			  </div>		  	
		  }
	  </div>
	);
}

export default Blog;
