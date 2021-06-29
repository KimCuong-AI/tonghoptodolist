import axios from "axios";
import { GET_TASK_API } from "../constant/TodolistConstant";

export const getTaskListApi = () => {
    //tiền xử lý dữ liệu =xử lý function
    return dispatch => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'get',

        })
        promise.then((result) => {
            console.log(result.data);
            //nếu gọi api lấy  về kết quả thành công
            //=> set lại state của component
            dispatch({
                type: GET_TASK_API,
                taskList: result.data,
            })
        });
        promise.catch((error) => {
            console.log(error.response.data);
            // console.log(error)
        })
    }
}
export const addTaskApi = (taskNamee) => {
    return async dispatch => {
        try {
            let result = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'post',
                data: { taskName: taskNamee }
            })

            dispatch(getTaskListApi())
        }


        //xử lý thât bại
        catch (errors) {
            alert(errors.response?.data)
        }
    }
}
export const deleteTaskApi = (taskName) => {
    return async dispatch => {
        try {
            let result = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: 'delete'

            })
            dispatch(getTaskListApi())
        }
        //xử lý thât bại
        catch (errors) {
            alert(errors.response.data)
        }

    }
}
export const checkTaskApi = (taskName) => {
    return async dispatch => {
        try {
            let promise = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
                method: 'PUT',
            });
            dispatch(getTaskListApi());
        }

        catch (errors) {
            alert(errors.response.data)
        }
    }
}
export const rejectTaskApi = (taskName) => {
    return async dispatch => {
        try {
            let promise = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
                method: 'PUT',
            })
            dispatch(getTaskListApi());

        }

        catch (error) {
            alert(error.response.data)
        }
    }
}
// export const updateTaskApi = (taskName) => {
//     //tiền xử lý dữ liệu =xử lý function
//     return dispatch => {
//         let promise = axios({
//             url: `http://svcy.myclass.vn/api/ToDoList/AddTask`,
//             method: 'POST',
//             data:{taskName: taskName}
//         })
//         promise.then((result) => {
//             dispatch(getTaskListApi())

//             console.log(result.data);
//             //nếu gọi api lấy  về kết quả thành công
//             //=> set lại state của component
           
//         });
//         promise.catch((error) => {
//             console.log(error.response.data);
//             // console.log(error)
//         })
//     }
// }
  