import axios from 'axios'
import { useEffect, useState } from 'react'
const api_key = process.env.REACT_APP_API_KEY

export const Weather = ({ name }) => {
  const [weatherData, setWeatherData] = useState([])
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}`
      )
      .then((response) => {
        setWeatherData(response.data)
      })
  }, [name])

  // check weatherData exists
  if (weatherData.name) {
    return (
      <div>
        <h2>Weather in {weatherData.name} </h2>
        <p>
          temperature {Number(weatherData.main.temp - 273.15).toFixed(2)}{' '}
          Celsius
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt=''
        ></img>
        <p>wind {weatherData.wind.speed} m/s</p>
      </div>
    )
  }
  return <div></div>
}
