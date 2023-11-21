import {AnyAction, combineReducers} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "app/index";
import {authReducer} from "features/auth/model/slice/auth-reducer";
import {taskReducer} from "features/Tasks/model/slice/taskSlice";
import {todoReducer} from "features/TodoLists/model/slice/todoSlice";

export const reducers = combineReducers({
    tasks: taskReducer,
    todoList: todoReducer,
    app: appReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: reducers
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppState, unknown, AnyAction>



