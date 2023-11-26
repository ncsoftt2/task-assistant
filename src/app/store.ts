import {configureStore} from "@reduxjs/toolkit";
import {taskReducer} from "features/Tasks";
import {todoReducer} from "features/TodoLists";
import { authReducer } from "features/auth";
import { appReducer } from "./app.reducer";

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        todoList: todoReducer,
        app: appReducer,
        auth: authReducer
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



