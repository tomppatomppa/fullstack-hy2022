import { Languages } from './languages'

export const CountryInfo = ({ country }) => {
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
