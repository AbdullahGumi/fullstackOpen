import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 1 },
    { name: 'Arto marine', id: 2 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    const personName = persons.map(per => per.name)

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <p key={person.id}>{person.name}{': '}{person.number}</p>)}
    </div>
  )
}

export default App