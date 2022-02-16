const Number = ({ value, onChange }) => {
  return (
    <div>
      number: <input value={value} onChange={onChange}></input>
    </div>
  )
}

export default Number
