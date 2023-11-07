import {TodoListType} from "../../../../api/todo-list-api";
import {RequestStatusType} from "../../app/slice/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTodoTC} from "../thunk/fetchTodoList";
import {createTodoTC} from "../thunk/createTodo";
import {deleteTodoTC} from "../thunk/deleteTodo";
import {updateTodoTitleTC} from "../thunk/updateTodoTitle";

export type TodoFilterType = "all" | "active" | "completed"

export type TodoListReducerType = TodoListType & {
    filter: TodoFilterType,
    entityStatus: RequestStatusType
}

const initialState:TodoListReducerType[] = []

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        changeTodoFilterAC: (state,action:PayloadAction<{todoId: string, filter: TodoFilterType}>) => {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl,filter:action.payload.filter} : tl)
        },
        changeTodoStatusAC: (state,action:PayloadAction<{todoId:string,entityStatus:RequestStatusType}>) => {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl,entityStatus:action.payload.entityStatus} : tl)
        },
        clearDataAC: () => {
            return []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodoTC.fulfilled,(_,action) => {
            return action.payload.map(tl => ({...tl,entityStatus:"idle",filter:"all"}))
        })
        builder.addCase(createTodoTC.fulfilled,(state,action) => {
            state.unshift({...action.payload,entityStatus:'idle',filter:"all"})
        })
        builder.addCase(deleteTodoTC.fulfilled,(state,{payload}) => {
            return state.filter(t => t.id !== payload)
        })
        builder.addCase(updateTodoTitleTC.fulfilled,(state,action) => {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl,title:action.payload.title} : tl)
        })
    }
})

export const todoListReducer = todoSlice.reducer
export const {changeTodoStatusAC, changeTodoFilterAC,clearDataAC} = todoSlice.actions

