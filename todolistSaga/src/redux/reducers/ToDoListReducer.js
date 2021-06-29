import { GET_TASK_API } from "../actions/ToDoListConst"

const initialState = {
    taskList:[]

}

export const ToDoListReducer= (state = initialState, action) => {
    console.log('action',action)
    switch (action.type) {

    case GET_TASK_API:
        state.taskList=action.taskList;
        return { ...state }

    default:
        return state
    }
}
