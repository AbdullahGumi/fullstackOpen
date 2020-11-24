import React from 'react';

const Persons = ({ filteredName, persons }) => {
 return (
 	<div> 
 		{filteredName.length > 0 ? (filteredName.map(name => <p key={name}>{name}</p>)
        ) : (
        persons.map(person => <p key={person.number}>{person.name}{': '}{person.number}</p>)
        )
      }
 	</div>	
 );
}

export default Persons;