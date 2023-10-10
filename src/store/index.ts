import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {todoReducer} from "./reducers/todos-reducer/todo-reducer";
import {taskReducer} from "./reducers/task-reducer/task-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TodoActionType} from "./reducers/todos-reducer/todo-actions";
import {TaskActionType} from "./reducers/task-reducer/task-actions";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const reducers = combineReducers({
    todoList:todoReducer,
    tasks:taskReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = legacy_createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)
type Actions = TodoActionType | TaskActionType
export type AppState = ReturnType<typeof reducers>
export type AppDispatch = ThunkDispatch<AppState, unknown, Actions>
export type ThunkType = ThunkAction<void, AppState, unknown, Actions>