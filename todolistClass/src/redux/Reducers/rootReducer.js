import {combineReducers} from 'redux';
import {createStore} from 'redux';

import ToDoListReducer from './ToDoListReducer'
export const rootReducer=combineReducers({
    ToDoListReducer,
})
// export const store=createStore(rootReducer);
