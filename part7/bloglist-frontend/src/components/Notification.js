import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = () => {
const notification = useSelector(state => state.notification)
	const variant = notification.messageColor;
	return (
		<div className='message'>
			{notification.message &&
			    <Alert variant={variant}>
			      {notification.message}
			    </Alert>			
			}
		</div>
	);
}


export default Notification;