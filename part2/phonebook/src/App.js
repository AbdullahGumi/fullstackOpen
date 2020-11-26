import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personService from './personService';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filteredName, setFilteredName ] = useState('');
  useEffect(() => {
    personService.getAllPersons().then(res => setPersons(res.data))
  }, [])

  const personName = persons.map(per => per.name);

  const addName = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    personName.includes(newName) ? (
    	window
    		.confirm(
    			`${newName} is already added to phonebook, do you want to replace the old number with a new one ?`
    		) && persons.map(person =>  
    							person.name === newName &&
    							 personService.changeNumber(person.id, {...newPerson, number: newNumber}))
      ) : (
      personService.addNewPerson(newPerson).then(res => setPersons([...persons, res.data]))
      );
  }

  const deleteName = id => {
  	personService.deletePerson(id);
  }

  const handleNameChange = e => {
    setNewName(e.target.value);
  }

    const handleNumberChange = e => {
    setNewNumber(e.target.value);
  }

  const filterNames = e => {
    let searchedName = e.target.value.toUpperCase();
    let filtered = personName.filter(name => name.toUpperCase().includes(searchedName));
    setFilteredName(filtered);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterNames={filterNames} />   
      <h2>Add a new </h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredName={filteredName} handleDelete={deleteName} />
    </div>
  )
}

export default App