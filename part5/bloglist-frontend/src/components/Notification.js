import React from 'react';

const Notification = ({ message, messageColor }) => {

	const messageStyle = {
		color: messageColor,
		width: '100vw',
		border: `3px solid ${messageColor}`,
		backgroundColor: '#eee',
		textAlign: 'center',
		fontSize: '25px'

	}

	return (
		<div>
			{message &&
				<div style={messageStyle}>
					<span>{message}</span>
				</div>				
			}
		</div>
	);
}

export default Notification;