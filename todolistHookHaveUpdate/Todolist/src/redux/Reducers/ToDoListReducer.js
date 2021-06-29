
import { ToDoListDarkTheme } from '../Themes/ToDoListDarkTheme'
import { CHANGE_THEME, EDIT_TASK, GET_TASK_API } from '../constant/TodolistConstant'
import { arrTheme } from '../Themes/ThemeManager'
const initialState = {
    themeToDoList: ToDoListDarkTheme,
    taskList: [],
    taskEdit: {},
    arrTheme: [],


}

export const ToDoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_API: {
            console.log(action)
            state.taskList = action.taskList
            return { ...state }
        }
        case EDIT_TASK: {
            console.log(action)
            state.taskEdit = { ...state.taskEdit, taskName: action.taskName };
            // let taskListUpdate = [...state.taskList];
            // let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);
            // if (index !== -1) {
            //     taskListUpdate[index] = state.taskEdit;
            // }
            // state.taskList = taskListUpdate;
            return { ...state }
        }
        case CHANGE_THEME: {
            console.log(action)
            //tìm theme dựa vào action.themeId được chọn
            let theme = arrTheme.find(theme => theme.id == action.themeId);
            if (theme) {
                //set lại theme cho state.themeToDoList
                state.themeToDoList = { ...theme.theme };
                return { ...state };
            }
            console.log(action)
        }
        default:
            return state
    }
}
