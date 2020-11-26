import React from 'react';

const Notification = ({ message, greenMessage }) => {
	const messageStyles = {
	  color: greenMessage ? ('green') :'red',
	  background: 'lightgrey',
	  fontSize: 20,
	  borderStyle: 'solid',
	  borderRadius: 5,
	  padding: 10,
	  marginBottom: 10,
	}

	if (message === null) {
    return null
  }

  return (
  	<div>
  		{message &&
		    <div style={messageStyles}>
		      {message}
		    </div>
  		}
  	</div>
  )
}

export default Notification;