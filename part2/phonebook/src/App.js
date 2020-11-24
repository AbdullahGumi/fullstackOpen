import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', id: 1 },
    { name: 'Arto marine', id: 2 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      id: persons.length + 1,
    }
    const personName = persons.map(per => per.name)

    personName.includes(newName) ? (alert(`${newName} is already added to phonebook`)
      ) : (
      setPersons([...persons, newPerson]));
      // console.log('good to go')
  }

  const handleInputChange = e => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id}>{person.name}</p>)}
    </div>
  )
}

export default App