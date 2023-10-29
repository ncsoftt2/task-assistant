import {todoListAPI, TodoListType} from "../../../api/todo-list-api";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ThunkType} from "../../index";
import {handleNetworkError, handleServerError} from "../../../utils/handleError";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
        setTodoListAC: (_,action:PayloadAction<{todoList:TodoListType[]}>) => {
            return action.payload.todoList.map(tl => ({...tl,entityStatus:"idle",filter:"all"}))
        },
        createNewTodoAC: (state,action:PayloadAction<{todoList:TodoListType}>) => {
            state.unshift({...action.payload.todoList,entityStatus:'idle',filter:'all'})
        },
        deleteTodoAC: (state,action:PayloadAction<{todoId:string}>) => {
            return state.filter(tl => tl.id !== action.payload.todoId)
        },
        updateTodoTitleAC: (state,action:PayloadAction<{todoId: string, title: string}>) => {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl,title:action.payload.title} : tl)
        },
        changeTodoFilterAC: (state,action:PayloadAction<{todoId: string, filter: TodoFilterType}>) => {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl,filter:action.payload.filter} : tl)
        },
        changeTodoStatusAC: (state,action:PayloadAction<{todoId:string,entityStatus:RequestStatusType}>) => {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl,entityStatus:action.payload.entityStatus} : tl)
        },
        clearDataAC: () => {
            return []
        },
    }
})

export const todoListReducer = todoSlice.reducer
export const {setTodoListAC,deleteTodoAC,updateTodoTitleAC,changeTodoStatusAC,
createNewTodoAC,changeTodoFilterAC,clearDataAC} = todoSlice.actions



export const getTodoThunk = ():ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        const response = await todoListAPI.getTodoList()
        dispatch(setTodoListAC({todoList:response.data}))
        dispatch(setAppStatusAC({status:'succeeded'}))
        // response.data.forEach(tl => {
        //     dispatch(getTaskThunk(tl.id))
        // })
    } catch (e: any) {
        dispatch(setAppErrorAC(e.message))
        dispatch(setAppStatusAC({status:'failed'}))
    } finally {
        dispatch(setAppStatusAC({status:'idle'}))
    }
}

export const createTodoThunk = (title:string):ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        const response = await todoListAPI.createTodoList(title)
        if(response.data.resultCode === 0) {
            dispatch(createNewTodoAC({todoList:response.data.data.item}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e.message,dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'idle'}))
    }
}

export const deleteTodoThunk = (id:string):ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    dispatch(changeTodoStatusAC({todoId:id,entityStatus:'loading'}))
    try {
        const response = await todoListAPI.deleteTodoList(id)
        if(response.data.resultCode === 0) {
            dispatch(deleteTodoAC({todoId:id}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e.message,dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'idle'}))
    }

}

export const updateTodoTitleThunk = (id:string, title:string):ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    const response = await todoListAPI.updateTodoListTitle(id,title)
    try {
        if(response.data.resultCode === 0) {
            dispatch(updateTodoTitleAC({todoId:id,title:title}))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e.message,dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'idle'}))
    }
}