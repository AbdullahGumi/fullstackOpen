import React from 'react';

const Notification = ({ errorMessage }) => {
	return (
		<div>
			<span>{errorMessage}</span>
		</div>
	);
}

export default Notification;