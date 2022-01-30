import React from 'react'

const Part = (props) => {
  return (
    <p>
      {props.id.name} {props.id.excercises}
    </p>
  )
}
const Header = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}
const Content = (props) => {
  console.log(props)
  const [first, second, third] = props.parts
  return (
    <div>
      <Part id={first} />
      <Part id={second} />
      <Part id={third} />
    </div>
  )
}
const Total = (props) => {
  const [one, two, three] = props.parts
  return (
    <div>
      <p>
        Number of excercises{' '}
        {one.excercises + two.excercises + three.excercises}{' '}
      </p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      excercises: 10,
    },
    {
      name: 'Using props to pass data',
      excercises: 7,
    },
    {
      name: 'State of a component',
      excercises: 14,
    },
  ]

  return (
    <div>
      <Header course={course} />

      <Content parts={parts} />

      <Total parts={parts} />
    </div>
  )
}

export default App
