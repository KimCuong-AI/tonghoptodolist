import React, { Component } from 'react'
import style from './Todolist.css'
import axios from 'axios'
export default class Todolist extends Component {
    state = {
        taskList: [],
        values: {
            taskName: '',
        },
        errors: {
            taskName: '',
        },
    }
    getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'get',

        })
        promise.then((result) => {
            console.log(result.data);
            //nếu gọi api lấy  về kết quả thành công
            //=> set lại state của component
            this.setState({
                taskList: result.data,
            })
        });
        promise.catch((error) => {
            console.log(error.response.data);
            // console.log(error)
        })

    }
    //hàm sẽ tự độgn thực thi sau khi nội dung component được render
    componentDidMount() {
        this.getTaskList();
    }
    handleChange = (e) => {
        let { value, name } = e.target;
        console.log(value, name);
        let newValues = { ...this.state.values };
        newValues = { ...newValues, [name]: value }
        let newErrors = { ...this.state.errors };
        let regex = /^[a-z A-Z]+$/;
        if (!regex.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid';
        } else {
            newErrors[name] = '';
        }
        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })

    }
    addTask = (e) => {
        e.preventDefault();//dừng sự kiện submit form
        console.log(this.state.values.taskName)
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'post',
            data: { taskName: this.state.values.taskName }
        });
        //xử lý thành công
        promise.then(result => {
            console.log(result.data);
            this.getTaskList()
        })
        //xử lý thât bại
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }
 
    //xử lý reject task
    rejectTask=(taskName)=>{
        let promise=axios({
            url:`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method:'PUT',
        })
        promise.then(res=>{
            alert(res.data);
            this.getTaskList();
        })
        promise.catch(error=>{
            alert(error.response.data)
        })
    }
    //xử lý done task
    checkTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'put',
        });
        promise.then(res => {
            alert(res.data);
            this.getTaskList();
        })
        promise.catch(errors => {
            alert(errors.response.data)
        })

    }





    //hàm xử lý xóa task
    delTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'delete'

        })
        promise.then(result => {
            alert(result.data);
            this.getTaskList()


        })
        //xử lý thât bại
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }
    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type='button'  className="remove" type='button' onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' className="complete" onClick={() => {
                        this.checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>

        })
    }
    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type='button' className="complete" onClick={() => {
                        this.rejectTask(item.taskName)
                    }}>
                        <i className="fas fa-undo" /> 
                    </button>
                </div>
            </li>

        })
    }
    render() {
        return (
            <form onSubmit={this.addTask}>
                {/* <button onClick={() => { this.getTaskList() }}>get task list</button> */}
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
                                <input name='taskName' id="newTask"  onChange={this.handleChange} type="text" placeholder="Enter an activity..." />
                                <button id="addItem" onClick={() => {
                                }}>
                                    <i className="fa fa-plus" />
                                </button>

                            </div>
                            <p className='text text-danger'>{this.state.errors.taskName}</p>

                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}

                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskToDoDone()}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        )
    }
}
