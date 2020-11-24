import React from 'react';

const PersonForm = ({ addName, handleNameChange, handleNumberChange }) => {
 return (
 	<div> 
 		<form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
 	</div>	
 );
}

export default PersonForm;