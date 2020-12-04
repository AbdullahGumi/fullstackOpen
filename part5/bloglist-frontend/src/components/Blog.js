import React, { useState } from 'react'
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

const handleLike = () => {
	console.log('Liked...')

}

	return (
	  <div style={blogStyle}>
	  	{isView ? (
			  <div>
			    <p>{blog.title}<button onClick={handleBlogView}>hide</button></p>
			    <p>{blog.url}</p>
			    <p>{blog.likes}<button onClick={handleLike}>like</button></p>
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
