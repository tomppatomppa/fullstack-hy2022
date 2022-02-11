import React, { useState } from 'react'

const Person = (props) => {
  if (props.name.toLowerCase().indexOf(props.filter.toLowerCase()) > -1) {
    //console.log(props.filter, 'found in', props.name)
    return (
      <div>
        {props.name} {props.number}
      </div>
    )
  }
  return <div></div>
}
const Persons = (props) => {
  return (
    <div>
      {props.persons.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          filter={props.filter}
        />
      ))}
    </div>
  )
}
const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  )
}
const Number = ({ value, onChange }) => {
  return (
    <div>
      number: <input value={value} onChange={onChange}></input>
    </div>
  )
}
const PersonForm = ({ addPerson, value, onChange, number, numberHandler }) => {
  //console.log('onsubmit', onSubmit)
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={value} onChange={onChange} />
      </div>
      <Number value={number} onChange={numberHandler} />
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Tika west', number: '040-1123127', id: 2 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        value={newName}
        onChange={handleNameChange}
        number={newNumber}
        numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
