import React from 'react'

const Part = (props) => {
  return (
    <p>
      {props.id.name} {props.id.exercises}
    </p>
  )
}
const Header = (props) => {
  console.log(props)

  return (
    <div>
      <p>{props.course.name}</p>
    </div>
  )
}
const Content = (props) => {
  console.log(props)
  const [first, second, third] = props.course.parts
  return (
    <div>
      <Part id={first} />
      <Part id={second} />
      <Part id={third} />
    </div>
  )
}
const Total = (props) => {
  const [one, two, three] = props.course.parts

  return (
    <div>
      <p>
        Number of excercises {one.exercises + two.exercises + three.exercises}
      </p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }
  //

  //
  //
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
