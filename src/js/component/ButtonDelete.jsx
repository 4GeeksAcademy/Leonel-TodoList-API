import React from 'react'

const ButtonDelete = ({ deleteTask, setItemTask, setShowCardTasks, setUserName, setItemBoolean, setNewTask, setCountItem, setIsDeleting }) => {
  const handleButtonDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      deleteTask()
      setIsDeleting(false)
      setItemBoolean(false)
      setItemTask([])
      setShowCardTasks(false)
      setCountItem(0)
      setNewTask('')
      setUserName('')
    }, 2000)


  }
  return (
    <div>

      <button type="button" className="btn btn-success" onClick={handleButtonDelete} style={{
        display: 'block', marginLeft: 'auto', marginRight: 'auto',
        marginTop: '20px'

      }}>Delete all the task and the User!</button>



    </div>
  )
}

export default ButtonDelete