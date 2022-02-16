import React, { useState, useEffect } from 'react'
import personServices from './services/persons'
import Notification from './components/notification'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Person from './components/person'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({
    message: '',
    isError: false,
  })

  useEffect(() => {
    personServices
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
        console.log('initial Persons')
      })
      .catch((error) => {
        setErrorMessage({
          ...errorMessage,
          message: `'error loading initial data'`,
          isError: true,
        })
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((n) => n.name === newName)) {
      window.alert(`${newName} is already in added to phonebook`)
      updateNumber()
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personServices
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage({
            ...errorMessage,
            message: `Added ${newName}`,
            isError: false,
          })
          console.log(errorMessage)
        })
        .catch((error) => {
          setErrorMessage({
            ...errorMessage,
            message: `Error adding ${newName}`,
            isError: true,
          })
        })
      resetError()
      setNewName('')
      setNewNumber('')
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
        setErrorMessage({
          ...errorMessage,
          message: `Information of ${name} has already been removed from server`,
          isError: true,
        })
      })
    resetError()
  }
  const updateNumber = () => {
    const personData = persons.filter((n) => n.name === newName)
    const data = { ...personData[0], number: newNumber }
    personServices
      .update(data.id, data)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== data.id ? person : returnedPerson
          )
        )
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        setErrorMessage({
          ...errorMessage,
          message: `Information of ${data.name} has already been removed from server`,
          isError: true,
        })
      })
  }
  function resetError() {
    setTimeout(() => {
      setErrorMessage({ ...errorMessage, message: '', isError: false })
    }, 5000)
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
      <Notification message={errorMessage} />
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
