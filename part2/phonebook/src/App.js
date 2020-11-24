import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredName, setFilteredName ] = useState('')

  const personName = persons.map(per => per.name);

  const addName = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    personName.includes(newName) ? (alert(`${newName} is already added to phonebook`)
      ) : (
      setPersons([...persons, newPerson]));
      // console.log('good to go')
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
        <div>
          filter shown with  <input onChange={filterNames} />
        </div>    
      <h2>Add a new </h2>
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
      <h2>Numbers</h2>
      {filteredName.length > 0 ? (filteredName.map(name => <p key={name}>{name}</p>)
        ) : (
        persons.map(person => <p key={person.number}>{person.name}{': '}{person.number}</p>)
        )
      }
    </div>
  )
}

export default App