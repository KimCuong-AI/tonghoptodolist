import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTaskApi, checkTaskApi, deleteTaskApi, getTaskListApi, rejectTaskApi } from '../../redux/actions/ToDoListAction';
import { GET_TASK_API } from '../../redux/actions/ToDoListConst';


export default function ToDoListRedux(props) {
    //lấy taskList từ redux về
    const { taskList } = useSelector(state => state.ToDoListReducer);
    const dispatch = useDispatch()

    let [state, setState] = useState({
        values: {
            taskName: '',
        },
        errors: {
            taskName: '',
        },
    });
    const getTaskList = () => {
        // dispatch(getTaskListApi)  
        dispatch(getTaskListApi())

    }
    useEffect(() => {
        getTaskList();
    }, [])
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

    const addTask = (e) => {
        e.preventDefault();//dừng sự kiện submit form
        // console.log(state.values.taskName);
        //xử lý nhân dữ liệu từ người dùng nhâp=> gọi action addTaskApi()
        dispatch(addTaskApi(state.values.taskName))
    }

    //xử lý done task
    const checkTask = (taskNamee) => {

        dispatch(checkTaskApi(taskNamee))
    }
    //xử lý reject task
    const rejectTask = (taskName) => {
       dispatch(rejectTaskApi(taskName))
    }


    //hàm xử lý xóa task
    const delTask = (taskName) => {
            dispatch(deleteTaskApi(taskName))
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
        <form onSubmit={addTask}>
            <div className="card">
                <div className="card__header">
                    <img src="./bg.png" />
                </div>
                {/* <h2>hello!</h2> */}
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
            </div>

        </form>
    )
}
