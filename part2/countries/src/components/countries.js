import { CountryInfo } from './countryinfo'
import { Show } from './show'

export const Countries = ({ countries, wordFilter }) => {
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
          <CountryInfo key={country.name.common} country={country} />
        ))}
      </div>
    )
  }
  return (
    <div>
      <Show result={result} />
    </div>
  )
}
