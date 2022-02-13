import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Countries } from './components/countries'
import { Filter } from './components/filter'

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
