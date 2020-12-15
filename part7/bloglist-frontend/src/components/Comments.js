import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

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
          <Button variant="outline-success" size='sm' onClick={() => setFormVisible(true)}>add a comment</Button>
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
              <Button variant="outline-success" size='sm' type="submit">create</Button>
            </form>              
          }            
		</div>
	);
}

export default Comments;