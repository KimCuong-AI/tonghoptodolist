// import { combineReducers } from "redux";

import { applyMiddleware, combineReducers, createStore } from "redux";
import { ToDoListReducer } from "./reducers/ToDoListReducer";
//middleware saga
import createMiddleWare from 'redux-saga'
import { rootSaga } from "./sagas/rootSaga";
// import thunk from "redux-thunk";
import thunk from "redux-thunk";
import { LoadingReducer } from "./reducers/LoadingReducer";
const middleWareSaga=createMiddleWare();


export const rootReducer=combineReducers({
    ToDoListReducer,
    LoadingReducer,
})
const store=createStore(rootReducer,applyMiddleware(thunk,middleWareSaga))
//gọi saga
middleWareSaga.run(rootSaga);
export default store


