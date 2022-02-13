export const Country = (props) => {
  return (
    <div>
      {props.name}
      <button onClick={props.onClick}>show</button>
    </div>
  )
}
