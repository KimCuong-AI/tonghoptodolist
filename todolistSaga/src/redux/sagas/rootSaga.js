import {all} from 'redux-saga/effects';
import *as ToDoListSaga from './ToDoListSaga';
import {theoDoiActionGetTaskApi} from './ToDoListSaga.js'
export function* rootSaga(){
    yield all([
        //nghiệp vụ theo dõi các action saga todolist
        ToDoListSaga.theoDoiActionGetTaskApi(),
        ToDoListSaga.theoDoiActionAddTaskApi(),
        ToDoListSaga.theoDoiActionDeleteTaskApi(),
        ToDoListSaga.theoDoiDoneTaskApi(),
        ToDoListSaga.theoDoiRejectTaskApi(),
        //nghiệp vụ ...
    ])
}