import React from 'react';
import PropTypes from 'prop-types'

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
		<div className='message'>
			{message &&
				<div style={messageStyle}>
					<span>{message}</span>
				</div>				
			}
		</div>
	);
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  messageColor: PropTypes.string.isRequired
}

export default Notification;