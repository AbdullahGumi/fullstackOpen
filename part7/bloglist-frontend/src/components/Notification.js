import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
const notification = useSelector(state => state.notification)
	const messageStyle = {
		color: notification.messageColor,
		width: '100vw',
		border: `3px solid ${notification.messageColor}`,
		backgroundColor: '#eee',
		textAlign: 'center',
		fontSize: '25px'

	}

	return (
		<div className='message'>
			{notification.message &&
				<div style={messageStyle}>
					<span>{notification.message}</span>
				</div>				
			}
		</div>
	);
}


export default Notification;