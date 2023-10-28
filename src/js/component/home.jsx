import React, { useEffect, useState } from "react";
import ButtonDelete from "./ButtonDelete";
import '../../styles/index.css';
import InputName from "./InputName";
//include images into your bundle

//create your first component
const Home = () => {
    const [inputTask, setNewTask] = useState('')
    const [isMouseOver, setIsMouseOver] = useState([false])
    const [countItem, setCountItem] = useState(0)
    const [itemTask, setItemTask] = useState([])
    const [itemBoolean, setItemBoolean] = useState(false)
    const [userNameRender, setUserName] = useState('')
    const [showCardTasks, setShowCardTasks] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)





    let url = 'https://playground.4geeks.com/apis/fake/todos/user/'
    let count = 0
    const handleInputTask = (e) => {
        setNewTask(e.target.value)
    }
    const handleKeyEnter = async (e) => {
        try {
            if (e.key === 'Enter' && e.target.value !== '') {

                let obj = {
                    label: inputTask,
                    done: false
                }
                setItemTask([...itemTask, obj])
                count = countItem + 1
                setItemBoolean(true)

                setCountItem(count)
                setIsMouseOver([...isMouseOver, false])
                setNewTask('')

                const setPutData = await putData()
                console.log('Sending Data...', setPutData)
            }
        }
        catch (error) {
            console.log('RequestedFailed!', error)
        }
    }

    ///////// /////// /////// /////// /////// /////// ///////POST DATA  /////// /////// /////// /////// /////// /////// /////// ///////

    useEffect(() => {
        if (userNameRender !== '') {
            postData()
        }
    }, [userNameRender])


    const postData = async () => {

        try {
            let userNameFinal = userNameRender
            let urlAPI = url + userNameFinal
            const response = await fetch(urlAPI, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify([])
            });

            if (response.ok) {
                const jsonResponse = await response.json()
                console.log(jsonResponse)
                console.log('new user created!')
            }

            else if (userNameRender == userNameRender) {
                const jsonResponse = await response.json()
                console.log(jsonResponse)
                console.log('this user is part of the API')
                console.log('esto solo deberia mostrarse cuando el usuario es el mismo!')
                getData()
            }
            else {
                throw new Error('Requested Failed')
            }
        }

        catch (error) {
            console.log('Error Getting the API', error)
        }
    }

    ///////// /////// /////// /////// /////// /////// ///////PUT DATA  /////// /////// /////// /////// /////// /////// /////// ///////

    const putData = async () => {
        try {
            let userNameFinal = userNameRender
            let urlAPI = url + userNameFinal
            // console.log(urlAPI)
            const responsePut = await fetch(urlAPI, {
                method: 'PUT',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(itemTask)
            });

            if (responsePut.ok) {
                const jsonResponsePut = await responsePut.json()
                return jsonResponsePut.msg
            }
            else {
                throw new Error('Requested Failed! Check it out')
            }
        }
        catch (error) {
            console.log('Requested of GET failed', error)
        }
    }


    ///////// /////// /////// /////// /////// /////// ///////GET DATA  /////// /////// /////// /////// /////// /////// /////// ///////


    const getData = async () => {
        try {

            let userNameFinal = userNameRender
            let urlAPI = url + userNameFinal
            // console.log(urlAPI)
            const responseGet = await fetch(urlAPI, {
                method: 'GET',
                headers: {
                    'Content-type': "application/json"
                },
            });

            if (responseGet.ok) {
                const jsonResponseGet = await responseGet.json()
                const label = jsonResponseGet.map(labelResponse => labelResponse)
                setItemTask(label)
                count = parseInt(label.length, 10)
                setCountItem(count)
                setItemBoolean(true)
            }


            else {
                throw new Error('Requested Failed! Check it out')
            }
        }


        catch (error) {
            console.log('Rquested of GET failed', error)
        }
    }



    ///////// /////// /////// /////// /////// /////// ///////DELETE DATA  /////// /////// /////// /////// /////// /////// /////// ///////
    const deleteTask = async () => {
        try {
            setCountItem(count)
            let userNameFinal = userNameRender
            let urlAPI = url + userNameFinal
            // console.log(urlAPI)
            const responseDelete = await fetch(urlAPI, {
                method: 'DELETE',
                headers: {
                    'Content-type': "application/json"
                },
            })
            if (responseDelete.ok) {
                const jsonResponseDelete = await responseDelete.json()
                console.log(jsonResponseDelete)
            }
            else {
                throw new Error('Requested Failed! Doesnt exist an username')
            }
        }

        catch (error) {
            console.log('Rquested of Delete failed', error)
        }
    }

    return (


        !isDeleting ? (
            !showCardTasks ? (<InputName setShowCardTasks={setShowCardTasks} setUserName={setUserName} postData={postData} />) :
                (
                    <div className="container-md" style={{
                        backgroundColor: '#F6F6F6',
                        position: 'relative',
                        width: '100%'
                    }}>

                        <div className='title-todo'>
                            <h1 style={{
                                color: '#ECDFDF',
                                textAlign: 'center',

                            }}>Todos by {userNameRender}</h1>
                        </div>
                        <div className="card" style={{
                            width: "30%", display: 'block', marginLeft: 'auto', marginRight: 'auto',
                            borderRadius: 0,
                            borderBottom: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                        }}>
                            <ul className="list-group list-group-flush">
                                <input
                                    style={{
                                        border: 'none',
                                        borderBottom: '1px solid #F4F1F1',
                                        height: '40px',
                                        paddingLeft: '30px',
                                        borderLeft: '1px solid #D2D2D2',
                                        borderRight: '1px solid #D2D2D2',
                                    }}
                                    type="text" name="inputValue"
                                    placeholder="What needs to be done?"
                                    onChange={handleInputTask}
                                    value={inputTask}
                                    onKeyDown={handleKeyEnter} />

                                {itemTask.map((item, index) => {

                                    return (
                                        <div className="checkbox-container">
                                            <li className="list-group-item d-flex justify-content-between align-items-center classList"
                                                key={index}>
                                                <label htmlFor={`checkbox - ${index}`}>
                                                    {item.label}
                                                    <input className="checkBoxButton"
                                                        type="checkbox"
                                                        id={`checkbox - ${index}`}
                                                    />
                                                </label>
                                            </li>

                                        </div>
                                    )
                                })}
                            </ul>
                            <div className='cardFooter' style={{
                                height: '20px',
                                padding: '3px',
                                borderBottom: '1px solid #D2D2D2',
                                borderLeft: '1px solid #D2D2D2',
                                borderRight: '1px solid #D2D2D2',
                                borderRadius: 0,
                            }}>
                                <p style={{
                                    paddingLeft: '10px',
                                    fontSize: '10px',
                                    color: "#D4D4D4"
                                }}>{!itemBoolean ? 'No tasks, add a task' : `${countItem} Item Left`}
                                </p>
                            </div>
                            {
                                itemBoolean && (<>
                                    <div className='secondFooter'
                                        style={{
                                            height: "5px",
                                            width: '99.2%',
                                            marginLeft: '1.5px',
                                            marginRight: '1px',
                                            borderBottom: '1px inset #D2D2D2',
                                            borderLeft: '1px inset #D2D2D2',
                                            borderRight: '1px inset #D2D2D2',
                                            borderTop: 'none',
                                            borderRadius: 0,
                                        }}
                                    />
                                    <div className='thirdFooter'
                                        style={{
                                            height: "5px",
                                            borderBottom: '1px inset #D2D2D2',
                                            borderLeft: '1px inset #D2D2D2',
                                            borderRight: '1px inset #D2D2D2',
                                            borderTop: 'none',
                                            width: '98.8%',
                                            marginLeft: '2px',
                                            marginRight: '1px',
                                            borderRadius: 0,
                                        }}
                                    />
                                </>)
                            }
                        </div >
                        <ButtonDelete deleteTask={deleteTask} setItemTask={setItemTask} setShowCardTasks={setShowCardTasks} setIsDeleting={setIsDeleting} setItemBoolean={setItemBoolean} />
                    </div >
                )
        )
            :
            (<div className="deletingRender"> Deleting tasks and user....</div>)
    )
};

export default Home;

