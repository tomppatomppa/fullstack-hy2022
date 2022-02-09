import React from 'react'

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}
const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>
        Number of excercises{' '}
        {props.parts.reduce(
          (previous, current) => previous + current.exercises,
          0
        )}
      </p>
    </div>
  )
}
const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4,
      },
    ],
  }

  return <Course course={course} />
}

export default App
