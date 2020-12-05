import React, { useState } from 'react'

import blogService from '../services/blogs';


const Blog = ({ blog }) => {

const [isView, setView] = useState(false);

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

}

	return (
	  <div style={blogStyle}>
	  	{isView ? (
			  <div>
			    <p>{blog.title}<button onClick={handleBlogView}>hide</button></p>
			    <p>{blog.url}</p>
			    <p>{blog.likes}<button onClick={()=> handleLike(blog.id, blog)}>like</button></p>
			    <p>{blog.author}</p>
			  </div>	  			
	  		) : (
			  <div>
			    {blog.title} {blog.author}<button onClick={handleBlogView}>view</button>
			  </div>	  		
	  		)
	  	}
	  </div>
	);
}

export default Blog;
