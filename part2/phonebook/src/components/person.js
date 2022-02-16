const Person = (props) => {
  if (props.name.toLowerCase().indexOf(props.filter.toLowerCase()) > -1) {
    //console.log(props.filter, 'found in', props.name)
    return (
      <div>
        {props.name} {props.number}{' '}
        <button onClick={props.onClick}>delete</button>
      </div>
    )
  }
  return <div></div>
}

export default Person
