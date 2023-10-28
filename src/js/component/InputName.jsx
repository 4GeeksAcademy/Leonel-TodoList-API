import React, { useState } from 'react'


const InputName = ({ setShowCardTasks, setUserName, postData}) => {
  const [value, setValue] = useState('')


  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleClickButton = async () => {
    try {
      setShowCardTasks(true)
      setUserName(value)
      const sendingPost = await postData()
      console.log('sending Information', sendingPost)
     
    }

    catch (error) {
      console.log('There is an error', error)
    }
  }


  return (
    <div className="container-md containerInput">
      <div>
        <h1 className='titleInput'>Welcome to the TodoList Using React!</h1>
      </div>
      <div className='labelName'>
        <label for="InputUserName" className='title'> Set your UserName!</label>
      </div>
      <div>
        <input
          type='text'
          id='userNameInput'
          value={value}
          onChange={handleInputChange}
          className='inputName'

        />

      </div>

      <div>
        <button type="button" className="btn btn-light name"
          onClick={handleClickButton}>Submit</button>

      </div>

    </div>
  )
}

export default InputName