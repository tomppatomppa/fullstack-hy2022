import Number from './number'

const PersonForm = ({ addPerson, value, onChange, number, numberHandler }) => {
  //console.log('onsubmit', onSubmit)
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={value} onChange={onChange} />
      </div>
      <Number value={number} onChange={numberHandler} />
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
