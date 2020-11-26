import React from 'react';

const Persons = ({ filteredName, persons, handleDelete }) => {
	const deletePrompt = (name, id) => {
		const result = window.confirm(`Are you sure you want to delete ${name} ?`);
		result && handleDelete(id);
	}
 return (
 	<div> 
 		{filteredName.length > 0 ? (filteredName.map(name => <p key={name}>{name}</p>)
        ) : (
        persons.map(person => {
        	return (
        		<p key={person.number}>
                    <span>{person.name}{': '}{person.number}</span>
	        		<button onClick={() => deletePrompt(person.name, person.id)}>Delete</button>
        		</p>
        	);
        })
        )
      }
 	</div>	
 );
}

export default Persons;