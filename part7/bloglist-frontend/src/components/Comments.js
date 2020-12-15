import React, { useState, useEffect } from 'react';

import commentsService from '../services/comments';

const Comments = ({ sameBlog }) => {


  const [comments, setComments] = useState('');
  const [comment, setComment] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    commentsService.createComment(sameBlog.id, comment).then(res => setComments(comments.concat(res)))
    setComment('')
  }

  useEffect(() => {
    commentsService.getComments(sameBlog.id).then(res => setComments(res))
  },[])
	return (
		<div>
          <h2>comments</h2>
          <button onClick={() => setFormVisible(true)}>add a comment</button>
          {comments && comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
          {isFormVisible &&
            <form onSubmit={handleSubmit}>
              <div>
                  <input
                  id='title'
                  type="text"
                  value={comment}
                  name="Title"
                  onChange={({ target }) => setComment(target.value)}
                />
              </div>            
              <button type="submit">create</button>
            </form>              
          }            
		</div>
	);
}

export default Comments;