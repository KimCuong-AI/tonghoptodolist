import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../../redux/constant/ToDoListConstant';

export default function BaiTapToDoListSaga(props) {
    const dispatch = useDispatch();
    const { taskList } = useSelector(state => state.ToDoListReducer)
    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: '',
        },
    });

    const handleChange = (e) => {
        let { value, name } = e.target;
        console.log(value, name);
        let newValues = { ...state.values };
        newValues = { ...newValues, [name]: value }
        let newErrors = { ...state.errors };
        let regex = /^[a-z A-Z]+$/;
        if (!regex.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid';
        } else {
            newErrors[name] = '';
        }
        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }
    const getTaskList = () => {
        //dispatch action saga
        dispatch({
            type: GET_TASKLIST_API,
        })
    }

    const addTask = (e) => {
        e.preventDefault();//dừng sự kiện submit form
        // console.log(this.state.values.taskName)
        dispatch({
            type: ADD_TASK_API,
            taskName: state.values.taskName
        })
    }
    useEffect(() => {

        // gọi hàm getTaskList
        getTaskList();
        return () => {

        }
    }, [])

    //xử lý done task
    const checkTask = (taskName) => {
        dispatch({
            type: CHECK_TASK_API,
            taskName: taskName,
        })

    }
    //xử lý reject task
    const rejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASK_API,
            taskName: taskName,
        })


    }





    //hàm xử lý xóa task
    const delTask = (taskName) => {
        dispatch({
            type: DELETE_TASK_API,
            taskName: taskName,
        })
    }
    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type='button' className="remove" type='button' onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' className="complete" onClick={() => {
                        checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>

        })
    }

    const renderTaskToDoDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' className="complete" onClick={() => {
                        rejectTask(item.taskName)
                    }}>
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>

        })
    }
    return (

        <div className="card">
            <button onClick={() => {
                dispatch({
                    type: 'getTaskApiAction'
                })
            }} className='btn btn-success'>Dispatch action saga getTaskApi</button>
            <div className="card__header">
                <img src='./bg.png' />
            </div>
            {/* <h2>hello!</h2> */}
            <form onSubmit={addTask}>
                <div className="card__body">
                    <div className="card__content">
                        <div className="card__title">
                            <h2>My Tasks</h2>
                            <p>September 9,2020</p>
                        </div>
                        <div className="card__add">
                            <input id="newTask" name='taskName' type="text" placeholder="Enter an activity..." onChange={handleChange} />
                            <button id="addItem">
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <p className='text text-danger'>{state.errors.taskName}</p>

                        <div className="card__todo">
                            {/* Uncompleted tasks */}
                            <ul className="todo" id="todo">
                                {renderTaskToDo()}

                            </ul>
                            {/* Completed tasks */}
                            <ul className="todo" id="completed">
                                {renderTaskToDoDone()}

                            </ul>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}
