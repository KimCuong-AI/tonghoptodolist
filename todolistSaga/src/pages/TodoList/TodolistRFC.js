import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function TodolistRFC(props) {
    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: '',
        },
    });
    const getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'get',

        })
        promise.then((result) => {
            console.log(result.data);
            //nếu gọi api lấy  về kết quả thành công
            //=> set lại state của component
            setState({
                ...state,
                taskList: result.data,
            })
        });
        promise.catch((error) => {
            console.log(error.response.data);
            // console.log(error)
        })

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
        // console.log(this.state.values.taskName)
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'post',
            data: { taskName:state.values.taskName }
        });
        //xử lý thành công
        promise.then(result => {
            console.log(result.data);
           getTaskList()
        })
        //xử lý thât bại
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }

    //xử lý done task
    const checkTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'put',
        });
        promise.then(res => {
            alert(res.data);
            getTaskList();
        })
        promise.catch(errors => {
            alert(errors.response.data)
        })

    }
     //xử lý reject task
     const rejectTask=(taskName)=>{
        let promise=axios({
            url:`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method:'PUT',
        })
        promise.then(res=>{
            alert(res.data);
            getTaskList();
        })
        promise.catch(error=>{
            alert(error.response.data)
        })
    }





    //hàm xử lý xóa task
    const delTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'delete'

        })
        promise.then(result => {
            alert(result.data);
            getTaskList()


        })
        //xử lý thât bại
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }
    const renderTaskToDo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
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
        return state.taskList.filter(item => item.status).map((item, index) => {
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
        <form onSubmit={(addTask)}>
            <div className="card">
                <div className="card__header">
                <img src='./bg.png' />
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
