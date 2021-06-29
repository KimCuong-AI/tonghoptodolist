import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Dropdown } from '../componentToDoList/Dropdown.js'
import { Heading3 } from '../componentToDoList/Heading'
import { TextField } from '../componentToDoList/TextField'
import { Button } from '../componentToDoList/Button'
import { Container } from '../componentToDoList/Container'
import { Table, Th, Thead, Tr } from '../componentToDoList/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskListApi, addTaskApi, deleteTaskApi, checkTaskApi, rejectTaskApi, updateTaskApi } from '../redux/actions/TodolistAction.js'
import { arrTheme } from '../redux/Themes/ThemeManager.js'
import { CHANGE_THEME, EDIT_TASK } from '../redux/constant/TodolistConstant.js'
export default function Todolist(props) {
    const themeToDoList = useSelector(state => state.ToDoListReducer.themeToDoList);
    const taskList = useSelector(state => state.ToDoListReducer.taskList)
    const taskEdit = useSelector(state => state.ToDoListReducer.taskEdit)
    const dispatch = useDispatch()

    const [state, setstate] = useState({
        values: {
            // taskName: '',
        },
    });
    const handleChange = (e) => {
        let { value } = e.target;
        let newValue = { ...state.values, taskName: value };
        setstate({
            ...state,
            values: newValue,
        })
    }
    const getTaskList = () => {
        dispatch(getTaskListApi())
    }
    useEffect(() => {
        getTaskList()

    }, [])
    useEffect(() => {
        let newValue = { ...state.values, taskName: taskEdit.taskName };

        setstate({
            ...state,
            values: newValue,
        })
    }, [taskEdit])
    const addTask = () => {
        // e.preventDefault()
        dispatch(addTaskApi(state.values.taskName))
    }
    // const updateTask=()=>{
    //     dispatch(updateTaskApi(state.values.taskName))
    // }
    const delTask = (taskName) => {
        dispatch(deleteTaskApi(taskName))
    }
    //xử lý done task
    const checkTask = (taskName) => {

        dispatch(checkTaskApi(taskName))
    }
    //xử lý reject task
    const rejectTask = (taskName) => {
        dispatch(rejectTaskApi(taskName))
    }
    const renderTaskToDo = () => {

        return taskList.filter(item => !item.status).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }} >{task.taskName}</Th>
                <Th className='text-right'>
                    <Button
                        onClick={() => {

                            dispatch({ type: EDIT_TASK, taskName: task.taskName })

                        }}
                    >
                        <i className='fa fa-edit'></i>
                    </Button>
                    <Button onClick={() => {
                        checkTask(task.taskName)
                    }}>
                        <i className='fa fa-check'></i>
                    </Button>
                    <Button onClick={() => {
                        delTask(task.taskName)
                    }}>
                        <i className='fa fa-trash'></i>
                    </Button>

                </Th>
            </Tr>
        })
    }
    const renderTaskToDoDone = () => {
        // console.log(taskList)
        return taskList.filter(item => item.status).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }} >{task.taskName}</Th>
                <Th className='text-right'>


                    <Button onClick={() => {
                        rejectTask(task.taskName)
                    }}>
                        <i class="fa fa-undo"></i>
                    </Button>
                    <Button onClick={() => {
                        delTask(task.taskName)
                    }} >
                        <i className='fa fa-trash'></i>
                    </Button>
                </Th>
            </Tr>
        })
    }
    const renderTheme = () => {
        return arrTheme.map((theme, index) => {
            return <option value={theme.id}>{theme.name}</option>
        })
    }
    console.log(taskEdit)
    return (
        <ThemeProvider theme={themeToDoList} >
            <Container className='w-50 '>
                <Dropdown onClick={(e) => {
                    let { value } = e.target;
                    console.log(value)

                    //dispatch value lên reducer
                    dispatch({ type: CHANGE_THEME, themeId: value })
                }}>
                    {renderTheme()}
                </Dropdown>
                <Heading3 className='text-danger'>To do List</Heading3>
                <TextField value={state.values.taskName} label='task name' className='w-50' onChange={handleChange} />
                <Button className='ml-2' onClick={() => {
                    addTask()
                }}><i className='fa fa-plus'></i> Add task</Button>
                <Button className='ml-2'  ><i className='fa fa-upload'></i> Update task</Button>
                <hr />
                <Heading3>Task To Do</Heading3>
                <Table>
                    <Thead>
                        {renderTaskToDo()}
                    </Thead>
                </Table>
                <Heading3>Task Completed</Heading3>
                <Table>
                    <Thead>
                        {renderTaskToDoDone()}
                    </Thead>
                </Table>
            </Container>
        </ThemeProvider>
    )

}
