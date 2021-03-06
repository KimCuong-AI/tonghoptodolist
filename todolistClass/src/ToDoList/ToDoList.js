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
    //vi???t h??m render theme import ThemeManger
    renderTheme = () => {
        return arrTheme.map((theme, index) => {
            return <option value={theme.id}> {theme.name}  </option>
        })
    }
    // life cycle b???ng 16 nh???n v??o props m??i ???????c th???c thi tr?????c khi render
    // componentWillReceiveProps(newProps){
    //     console.log(this.props)
    //     console.log(newProps);
    //     this.setState({
    //         taskName:newProps.taskEdit.taskName,
    //     })
    // }

    //lifecycle t??nh kh??ng truy xu???t ???????c con tr??? this
    // static getDerivedStateFromProps(newProps,currentState){
    //     //newProps: l?? props m???i, props c?? l?? this.props(kh??ng truy xu???t ???????c)
    //     //currentState:???ng v???i state hi???n t???i this.state

    //     //tr??? v??? null state gi??? nguy??n
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
                        //dispatch value l??n reducer
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
                        //l???y th??ng tin ng?????i d??ng nh???p v??o t??? input
                        let { taskName } = this.state;
                        //t???o ra 1 task object
                        let newTask = {
                            id: Date.now(),
                            taskName: taskName,
                            done: false
                        }
                        console.log(newTask)
                        //????a task object l??n redux th??ng qua ph????ng th???c dispatch
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
    // ????y l?? lifecycle tr??? v??? props c?? vafd state c???a component tr?????c khi render (lifecycle n??y ch???y sau render)
    componentDidUpdate(prevProps, prevState) {
        // console.log('this.props',this.props)
        console.log('prevProps', prevProps)
        //so s??nh n???u tr??? v??? props c?? v?? state c???a component tr?????c khi render (lifecycle n??y ch???y sau render)
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
