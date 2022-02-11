import React, { useState } from 'react'

const Person = (props) => {
  console.log(props.name)
  return (
    <div>
      {props.name} {props.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (!checkDuplicates()) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  function checkDuplicates() {
    for (let i = 0; i < persons.length; i++) {
      if (persons.at(i).name === newName) {
        window.alert(`${newName} is already in added to phonebook`)
        return true
      }
    }
    return false
  }
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log('number change')
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{' '}
          <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, key) => (
          <Person key={key} name={person.name} number={person.number} />
        ))}
      </div>
    </div>
  )
}

export default App
