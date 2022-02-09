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
      <h2>{props.name}</h2>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Header key={props.id} name={props.name} />
      {props.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <Total key={props.id} parts={props.parts} />
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
      <h1>Web development curriculum</h1>
      {props.courses.map((coursename) => (
        <Content
          key={coursename.id}
          name={coursename.name}
          parts={coursename.parts}
        />
      ))}
    </div>
  )
}
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

export default App
