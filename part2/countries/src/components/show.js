import { Country } from './country'
import { useState } from 'react'
import { CountryInfo } from './countryinfo'
export const Show = ({ result }) => {
  const [countries, setCountries] = useState([])
  const [show, setShow] = useState(false)

  function toggleShow(name) {
    const item = Object.values(result).filter((value) => {
      return value.name.common.includes(name)
    })
    show ? setShow(false) : setShow(true)
    setCountries(item)
  }
  return (
    <div>
      {result.map((country) => (
        <Country
          key={country.name.common}
          name={country.name.common}
          onClick={() => {
            toggleShow(country.name.common)
          }}
        />
      ))}
      {show &&
        countries.map((countryData) => (
          <CountryInfo key={countryData.name.common} country={countryData} />
        ))}
    </div>
  )
}
