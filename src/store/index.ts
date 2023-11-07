import {AnyAction, combineReducers} from "redux";
import {taskReducer} from "./reducers/tasks/slice/task-reducer";
import {todoListReducer} from "./reducers/todo-list/slice/todo-list-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./reducers/app/slice/app-reducer";
import {authReducer} from "../features/Login/slice/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


export const reducers = combineReducers({
    tasks: taskReducer,
    todoList:todoListReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
    devTools: true
})


export type AppState = ReturnType<typeof reducers>
export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>
export type ThunkType = ThunkAction<void, AppState, unknown, AnyAction>