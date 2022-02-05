import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text} </button>
)
const StatisticsLine = ({ text, value }) => {
  return (
    <div>
      <p>
        {text} {value} {text === 'positive' ? '%' : ''}
      </p>
    </div>
  )
}
const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
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
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={all} />
      <StatisticsLine text='average' value={(good * 1 - bad * 1) / all} />

      <StatisticsLine text='positive' value={(good / all) * 100} />
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
