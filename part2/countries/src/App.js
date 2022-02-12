import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Country = (props) => {
  return <div>{props.name}</div>
}
const Languages = (props) => {
  return <li>{props.language}</li>
}
const SingleCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>{country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <Languages key={language} language={language} />
        ))}
      </ul>
      <div>
        <img alt='' src={Object.values(country.flags).at(0)}></img>
      </div>
    </div>
  )
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <input value={value} onChange={onChange} />
    </div>
  )
}
const Countries = ({ countries, wordFilter }) => {
  const result = Object.values(countries).filter((value) => {
    return value.name.common.toLowerCase().includes(wordFilter.toLowerCase())
  })

  if (result.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (result.length === 1) {
    return (
      <div>
        {result.map((country) => (
          <SingleCountry key={country.name.common} country={country} />
        ))}
      </div>
    )
  }
  return (
    <div>
      {result.map((country) => (
        <Country key={country.name.common} name={country.name.common} />
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
      <Countries countries={countries} wordFilter={newFilter} />
    </div>
  )
}

export default App
