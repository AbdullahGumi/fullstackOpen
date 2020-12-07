import React from "react";

const BlogForTest = ({ blog, onClick }) => (
  <div>
    <div className="blog-title">
      {blog.title} {blog.author}
    </div>
    <div>
      blog has <span className="blog-likes">{blog.likes}</span> likes
      <button className="blog-like-button" onClick={onClick}>
        like
      </button>
    </div>
  </div>
);

export default BlogForTest;
