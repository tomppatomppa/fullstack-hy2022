import React from 'react'

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.part.name} {props.part.excercises}
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
  console.log(props.items)

  return (
    <div>
      <Part part={props.part} />
    </div>
  )
}
const Total = (props) => {
  console.log(props)

  return (
    <div>
      <p>Number of excercises {props.total} </p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    excercises: 10,
  }
  const part2 = {
    name: 'Using props to pass data',
    excercises: 7,
  }
  const part3 = {
    name: 'State of a component',
    excercises: 14,
  }
  return (
    <div>
      <Header course={course} />

      <Content part={part1} />
      <Content part={part2} />
      <Content part={part3} />

      <Total total={part1.excercises + part2.excercises + part3.excercises} />
    </div>
  )
}

export default App
