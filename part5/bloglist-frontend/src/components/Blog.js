import React, { useState, useEffect } from 'react'

import blogService from '../services/blogs';


const Blog = ({ blog, reRenderAfterEvent }) => {

const [isView, setView] = useState(false);
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

const handleBlogView = () => {
	setView(!isView);

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
	reRenderAfterEvent()

}

const handleDelete = (blog) => {
	window.confirm(`Do you want to remove blog ${blog.title} by ${blog.author} ?`)
			&& blogService.deleteBlog(blog.id)
	
}

	return (
	  <div style={blogStyle} className='blog'>
	  	{isView ? (
			  <div className='blog-details'>
			    <p>{blog.title}<button onClick={handleBlogView}>hide</button></p>
			    <p>{blog.url}</p>
			    <p className='liked'>{blog.likes}<button onClick={()=> handleLike(blog.id, blog)}>like</button></p>
			    <p>{blog.author}</p>
			    {mainUser.id === blog.user.id &&
					<button onClick={() => handleDelete(blog)}>Remove</button>
			    }
			  </div>	  			
	  		) : (
			  <div className='blog-overview'>
			    {blog.title} {blog.author}<button onClick={handleBlogView}>view</button>
			  </div>	  		
	  		)
	  	}
	  </div>
	);
}

export default Blog;
