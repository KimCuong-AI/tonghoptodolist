import { ToDoListDarkTheme } from "../Themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../Themes/ToDoListLightTheme";
import { add_task, change_theme, done_task, delete_task, edit_task, update_task } from '../types/ToDoListTypes'
import { arrTheme } from '../Themes/ThemeManager'

const initialState = {
    themeToDoList: ToDoListDarkTheme,
    taskList: [
        { id: 'task-1', taskName: 'task 1', done: true },
        { id: 'task-2', taskName: 'task 2', done: false },
        { id: 'task-3', taskName: 'task 3', done: true },
        { id: 'task-4', taskName: 'task 4', done: false },
    ],
    taskEdit: { },


}

export default (state = initialState, action) => {
    switch (action.type) {
        case add_task: {
            //kiểm tra rỗng
            if (action.newTask.taskName.trim() === '') {
                alert('task name is required!')
                return { ...state }
            }
            //kiểm tra tồn tại
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName)
            if (index !== -1) {
                alert('task name already exist');
                return { ...state };
            }
            taskListUpdate.push(action.newTask);

            //xử lý xong thì gán taskList mới vào taskList
            state.taskList = taskListUpdate;
            return { ...state }
        }
        case change_theme: {
            //tìm theme dựa vào action.themeId được chọn
            let theme = arrTheme.find(theme => theme.id == action.themeId);
            if (theme) {
                //set lại theme cho state.themeToDoList
                state.themeToDoList = { ...theme.theme };
                return { ...state };
            }
            console.log(action)
        }
        case done_task: {
            console.log('done_task',action)
            //clic vào button check=>dispatch lên action có taskID            
            let taskListUpdate=[...state.taskList];
            //từ task id tìm ta task đó ở vị trí nào trong mảng tiến hành cập nhật lại thuộc tính done=true và cập nhật lại state của redux
            let index=taskListUpdate.findIndex(task=>task.id===action.taskId);
            if(index!==-1){
                taskListUpdate[index].done=true;

            }
            return { ...state,taskList:taskListUpdate }

        }
        case delete_task: {
            let taskListUpdate = [...state.taskList];
            taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId);
            state.taskList = taskListUpdate;

            return { ...state }
        }
        case edit_task: {

            return { ...state, taskEdit: action.task }
        }
        case update_task: {
            //chỉnh sửa lại taskName của taskEdit
            state.taskEdit = { ...state.taskEdit, taskName: action.taskName };
            //tìm trong taskList cập nhật lại taskEdit người dùng update
            let taskListUpdate = [...state.taskList];
            let viTri = taskListUpdate.findIndex(task => task.taskName === state.taskEdit.taskName)
            if (viTri !== -1) {
                alert('task name already exist');
            } else {
                let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);
                if (index !== -1) {
                    taskListUpdate[index] = state.taskEdit;
                }
                state.taskList = taskListUpdate;

            }
            return { ...state }
        }


        default:
            return { ...state }
    }
}
