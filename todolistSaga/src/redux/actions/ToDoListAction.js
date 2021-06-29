import axios from "axios";
import { GET_TASK_API } from "./ToDoListConst";
//Action có 2 loại
//Action thực thi ngày làm thay đổi reducer
//Action phải thực thi xử lý rồi mới gọi action 1 thực thi(asynb action)

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
            alert(errors.response.data)
        }
    }
}
export const deleteTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'delete'

        })
        promise.then(result => {
            alert(result.data);
            dispatch(getTaskListApi())


        })
        //xử lý thât bại
        promise.catch(errors => {
            alert(errors.response.data)
        })

    }
}
export const checkTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT',
        });
        promise.then(res => {
            // alert(res.data);
            dispatch(getTaskListApi());
        })
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }
}
export const rejectTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT',
        })
        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi());
        })
        promise.catch(error => {
            alert(error.response.data)
        })
    }

}
