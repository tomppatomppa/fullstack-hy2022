import React, { useState, useEffect } from 'react'
import personServices from './services/persons'
const Person = (props) => {
  if (props.name.toLowerCase().indexOf(props.filter.toLowerCase()) > -1) {
    //console.log(props.filter, 'found in', props.name)
    return (
      <div>
        {props.name} {props.number}{' '}
        <button onClick={props.onClick}>delete</button>
      </div>
    )
  }
  return <div></div>
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
        console.log('initial Persons')
      })
      .catch((error) => {
        console.log('error loading initial data')
      })
  }, [])

  const addPerson = (event) => {
    //const person = persons.find((n) => n.name === newName)
    event.preventDefault()
    if (!checkDuplicates()) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personServices
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch((error) => {
          console.log('coult not add person')
        })
      setNewName('')
      setNewNumber('')
    } else {
      updateNumber()
    }
  }
  const deletePersonsData = (id, name) => {
    window.confirm(`delete ${name}`)
    personServices
      .deletePerson(id)
      .then(
        personServices.getAll().then((initialPersons) => {
          setPersons(initialPersons)
        })
      )
      .catch((error) => {
        console.log('person already removed')
      })
  }
  const updateNumber = () => {
    const personData = persons.filter((n) => n.name === newName)
    //console.log(personData)
    const updatePersonNumber = { ...personData[0], number: newNumber }
    const id = updatePersonNumber.id
    // console.log(id)
    personServices
      .update(id, updatePersonNumber)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        )
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        console.log('error updating data')
      })
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
      {persons.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          filter={newFilter}
          onClick={() => deletePersonsData(person.id, person.name)}
        />
      ))}
    </div>
  )
}

export default App
