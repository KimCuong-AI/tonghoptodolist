import React, { Component } from 'react'
import { Container } from '../componentToDoList/Container'
import { ThemeProvider } from 'styled-components'
import { ToDoListDarkTheme } from '../redux/Themes/ToDoListDarkTheme'
import { ToDoListLightTheme } from '../redux/Themes/ToDoListLightTheme'
import { ToDoListPrimaryTheme } from '../redux/Themes/ToDoListPrimaryTheme';
import { Dropdown } from '../componentToDoList/Dropdown'
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from '../componentToDoList/Heading'
import { TextField, Label, Input } from '../componentToDoList/TextField'
import { Button } from '../componentToDoList/Button'
import { Table, Tr, Td, Th, Thead, Tbody } from '../componentToDoList/Table'
import { connect } from 'react-redux'
import { addTaskAction, changeThemeAction, deleteTaskAction, doneTaskAction, editTaskAction, updateTask } from '../redux/actions/ToDoListAction'
import { arrTheme } from '../redux/Themes/ThemeManager'
import { delete_task, update_task } from '../redux/types/ToDoListTypes'

class ToDoList extends Component {
    state = {
        taskName: '',
        disabled: true,
    }
    renderTaskToDo = () => {
        return this.props.taskList.filter(task => !task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
                <Th className='text-right'>
                    <Button onClick={() => {
                        this.setState({
                            disabled: false,
                        },()=>{
                            this.props.dispatch(editTaskAction(task))
                        })
                    }} className='ml-1'><i className='fa fa-edit'></i></Button>

                    <Button onClick={() => {
                        this.props.dispatch(doneTaskAction(task.id))
                    }} className='ml-1'><i className='fa fa-check'></i></Button>

                    <Button onClick={() => {
                        this.props.dispatch(deleteTaskAction(task.id))
                    }} className='ml-1'><i className='fa fa-trash'></i></Button>
                </Th>
            </Tr>
        })
    }
    renderTaskDone = () => {
        return this.props.taskList.filter(task => task.done).map((task, index) => {
            return <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
                <Th className='text-right'>
                    <Button onClick={() => {
                        this.props.dispatch(deleteTaskAction(task.id))
                    }} className='ml-1'><i className='fa fa-trash'></i></Button>
                </Th>
            </Tr>
        })
    }
    // handleChange=(e)=>{
    //     let {name,value}=e.target.value;
    //     this.setState({
    //         [name]:value,
    //     })
    // }
    //viết hàm render theme import ThemeManger
    renderTheme = () => {
        return arrTheme.map((theme, index) => {
            return <option value={theme.id}> {theme.name}  </option>
        })
    }
    // life cycle bằng 16 nhận vào props mói được thực thi trước khi render
    // componentWillReceiveProps(newProps){
    //     console.log(this.props)
    //     console.log(newProps);
    //     this.setState({
    //         taskName:newProps.taskEdit.taskName,
    //     })
    // }

    //lifecycle tĩnh không truy xuất được con trỏ this
    // static getDerivedStateFromProps(newProps,currentState){
    //     //newProps: là props mới, props cũ là this.props(không truy xuất được)
    //     //currentState:ứng với state hiện tại this.state

    //     //trả về null state giữ nguyên
    //     let newState={...currentState,taskName:newProps.taskEdit.taskName}
    //     return null;

    // }
    render() {
        // console.log('conco')
        return (
            <ThemeProvider theme={this.props.themeToDoList}>
                <Container className='w-50'>
                    <Dropdown onChange={(e) => {
                        let { value } = e.target;
                        //dispatch value lên reducer
                        this.props.dispatch(changeThemeAction(value))
                    }}>
                        {this.renderTheme()}
                    </Dropdown>
                    <Heading3 className='text-danger'>To do list</Heading3>
                    <TextField value={this.state.taskName} onChange={(e) => {
                        this.setState({
                            taskName: e.target.value,

                        }, () => {
                            console.log(this.state)
                        })
                    }} label='Task name' className='w-50' />
                    <Button onClick={() => {
                        //lấy thông tin người dùng nhập vào từ input
                        let { taskName } = this.state;
                        //tạo ra 1 task object
                        let newTask = {
                            id: Date.now(),
                            taskName: taskName,
                            done: false
                        }
                        console.log(newTask)
                        //đưa task object lên redux thông qua phương thức dispatch
                        this.props.dispatch(addTaskAction(newTask))

                    }} className='ml-2'><i className="fa fa-plus"></i> Add task</Button>
                    {this.state.disabled ?
                        <Button disabled onClick={() => {
                            this.props.dispatch(updateTask(this.state.taskName))
                        }} className='ml-2'><i className="fa fa-upload"></i> update task</Button> :
                        <Button onClick={() => {
                            let { taskName } = this.state;
                            this.setState({
                                disabled: true,
                                taskName: '',
                            }, () => {
                                this.props.dispatch(updateTask(taskName))

                            })
                        }} className='ml-2'><i className="fa fa-upload"></i> update task</Button>

                    }

                    <hr />
                    <Heading3>Task To Do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                        </Thead>
                    </Table>
                    <Heading3>Task Completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskDone()}

                        </Thead>
                    </Table>
                </Container>
            </ThemeProvider>
        )
    }
    // đây là lifecycle trả về props cũ vafd state của component trước khi render (lifecycle này chạy sau render)
    componentDidUpdate(prevProps, prevState) {
        // console.log('this.props',this.props)
        console.log('prevProps', prevProps)
        //so sánh nếu trả về props cũ và state của component trước khi render (lifecycle này chạy sau render)
        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName,
            })
        }
    }
}

const mapStateToProps = state => {
    return {
        themeToDoList: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit,
    }
}
export default connect(mapStateToProps)(ToDoList)
