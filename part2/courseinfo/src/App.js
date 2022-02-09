import React from 'react'
import { courses } from './components/courses'
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
  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

export default App
