// import { delay } from '@redux-saga/core/effects';
import { delay } from '@redux-saga/core/effects';
import axios from 'axios';
import { fork, take, call, put, takeLatest } from 'redux-saga/effects'
import { toDoListService } from '../../services/ToDoListService';
import { STATUS_CODE } from '../../util/constants/settingSystem';
import { GET_TASK_API } from '../actions/ToDoListConst';
import { DISPLAY_LOADING } from '../constant/LoadingConst';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, REJECT_TASK_API } from '../constant/ToDoListConstant';
/**redux có 2 loại action
 * Loại 1:action=> object(action thường)
 * Loại 2:action=> function(thường dùng để xử lý api hoặc các action khác)
 * 
 */

/**
 * 01/01/2021 cường viết chức năng getTaskApi
 * Action lấy danh sách task từ api
 */
function* getTaskApiAction(action) {
    //put giống dispatch action

    yield delay(500);
    try {
        yield put({
            type: DISPLAY_LOADING,
        })
        let { data, status } = yield call(toDoListService.getTaskApi)
        yield delay(1000);


        if (status === STATUS_CODE.SUCCESS) {
            // sau khi lấy giá trị thành  công dùng put(giống dispatch bên thunk)
            yield put({
                type: GET_TASK_API,
                taskList: data,
            });
        } else {
            console.log('error')
        }


    }
    catch (error) {
        console.log('error')
    }

    yield put({
        type: 'HIDE_LOADING',
    })
}
// export function* rootSaga() {
//     // yield takeLatest('getTaskApiAction', getTaskApi);// non-blocking chạy không cần chờ
// }
export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApiAction)
}
/**
 * 01/01/2021 cường viết chức năng getTaskApi
 * Action saga nghiệp vụ thêm task
 */

function* addTaskApiAction(action) {
    const { taskName } = action
    console.log(action);

    //goi api
    try {
        const { data, status } = yield call(() => {
            return toDoListService.addTaskApi(taskName)
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    }
    catch (error) {
        console.log(error)
    }

    //hiển thị loading
    //thành công thì load lại task= cách gọ lại action saga load tasklist
}
export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
}
/**
 * 01/01/2021 cường viết chức năng deleteTask
 * Action saga nghiệp vụ xóa task
 */
function* deleteTaskApi(action) {
    const { taskName } = action;
    try {
        //gọi api deletetask
        const { data, status } = yield call(() => {
            return toDoListService.deleteTaskApi(taskName);
        });
        if (status === STATUS_CODE.SUCCESS) {
            //nếu thành công thì gọi lại action GET_TASKLIST_API(action saga thực thi)
            yield put({
                type: GET_TASKLIST_API,
            })
        }

    }
    catch (error) {
        console.log(error)
    }
}
export function* theoDoiActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApi)
}

/**
 * 01/01/2021 cường viết chức năng donetask
 * Action saga nghiệp vụ donetask
 */
function* checkDoneTaskApi(action) {
    const { taskName } = action;
    try {
        const { data, status } = yield call(() => {
            return toDoListService.checkDoneTask(taskName);
        })
            yield put({
                type: GET_TASKLIST_API,
            })
        
    }
    catch (error) {
        console.log(error)
    }

}
export function* theoDoiDoneTaskApi() {
    yield takeLatest(CHECK_TASK_API, checkDoneTaskApi)
}

/**
 * 01/01/2021 cường viết chức năng rejectTask
 * Action saga nghiệp vụ rejectTask
 */
 function* rejectTaskApi(action) {
    const { taskName } = action;
    try {
        const { data, status } = yield call(() => {
            return toDoListService.rejectTask(taskName);
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API,
            })
        }
    }
    catch (error) {
        console.log(error)
    }

}
export function* theoDoiRejectTaskApi() {
    yield takeLatest(REJECT_TASK_API, rejectTaskApi)
}