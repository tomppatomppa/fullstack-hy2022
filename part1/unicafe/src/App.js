import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text} </button>
)

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    console.log('asdad')
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good * 1 - bad * 1) / all} </p>
      <p>positive {(good / all) * 100} % </p>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={good + neutral + bad}
      />
    </div>
  )
}

export default App
