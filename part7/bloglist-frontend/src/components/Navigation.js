import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ user, logout }) => {

  const menuStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 5,
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: 'dodgerblue',
  }

	return (
		<div style={menuStyle}>
	      <span><Link to ='/'>blogs</Link> </span>		
	      <span> <Link to ='/users'>users</Link> </span>		
          <span>Logged in as {user && user.name} <button onClick={logout}>Logout</button></span>
		</div>
	);
}

export default Navigation;