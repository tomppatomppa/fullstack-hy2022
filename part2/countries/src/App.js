import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Country = (props) => {
  if (props.name.toLowerCase().indexOf(props.filter.toLowerCase()) > -1) {
    return <div>{props.name}</div>
  }
  return <div></div>
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <input value={value} onChange={onChange} />
    </div>
  )
}
const Countries = ({ countries, filter }) => {
  function count() {
    let numberOfCountries = 0
    for (let i = 0; i < countries.length; i++) {
      {
        if (
          countries[i].name.common.toLowerCase().indexOf(filter.toLowerCase()) >
          -1
        ) {
          numberOfCountries++
        }
      }
    }
    return numberOfCountries
  }

  if (count() > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  return (
    <div>
      {countries.map((country) => (
        <Country
          key={country.name.common}
          name={country.name.common}
          filter={filter}
        />
      ))}
    </div>
  )
}
const App = () => {
  const [countries, addNewCountry] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      addNewCountry(response.data)
    })
  }, [])

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countries} filter={newFilter} />
    </div>
  )
}

export default App
