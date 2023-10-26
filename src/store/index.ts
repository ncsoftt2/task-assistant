import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {taskReducer} from "./reducers/tasks/task-reducer";
import {todoListReducer} from "./reducers/todo-list/todo-list-reducer";
import {TodoListAction} from "./reducers/todo-list/todo-list-actions";
import {TaskAction} from "./reducers/tasks/task-actions";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./reducers/app/app-reducer";
import {AppActions} from "./reducers/app/app-actions";
import {authReducer} from "../features/Login/auth-reducer";
import {AuthActions} from "../features/Login/auth-actions";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const reducers = combineReducers({
    tasks: taskReducer,
    todoList:todoListReducer,
    app: appReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = legacy_createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)

export type Actions = TodoListAction | TaskAction | AppActions | AuthActions
export type AppState = ReturnType<typeof reducers>
export type AppDispatch = ThunkDispatch<AppState, unknown, Actions>
export type ThunkType = ThunkAction<void, AppState, unknown, Actions>