const Notification = ({ message }) => {
  console.log(message)
  if (message.message === '') {
    return null
  }
  return (
    <div className={message.isError ? 'error' : 'success'}>
      {message.message}
    </div>
  )
  //   if (message.isError === true) {
  //     return <div className='error'> {message.message}</div>
  //   }
  //   console.log(message.isError)
  //   return <div className='success'> {message.message}</div>
}

export default Notification
