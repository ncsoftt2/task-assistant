import {TodoFilterType} from "./todo-list-reducer";
import {todoListAPI, TodoListType} from "../../../api/todo-list-api";
import {ThunkType} from "../../index";
import {setAppErrorAC, setAppStatusAC} from "../app/app-actions";
import {RequestStatusType} from "../app/app-reducer";
import {handleNetworkError, handleServerError} from "../../../utils/handleError";

export type TodoListAction =
    | ReturnType<typeof createNewTodoAC>
    | ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof updateTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof setTodoListAC>
    | ReturnType<typeof changeTodoStatusAC>

export const createNewTodoAC = (todoList:TodoListType) => ({type: "ADD-NEW-TODO",todoList} as const)
export const deleteTodoAC = (todoId: string) => ({type: "REMOVE-TODO", todoId} as const)
export const updateTodoTitleAC = (todoId: string, title: string) => ({
    type: "CHANGE-TODO-TITLE", todoId, title} as const)
export const changeTodoFilterAC = (todoId: string, filter: TodoFilterType) => ({
    type: "CHANGE-TODO-FILTER", todoId, filter} as const)
export const setTodoListAC = (todoList:TodoListType[]) => ({type:"SET-TODOLIST", todoList} as const)
export const changeTodoStatusAC = (todoId:string,entityStatus:RequestStatusType) => (
    {type:"CHANGE-TODO-STATUS",todoId,entityStatus} as const)

export const getTodoThunk = ():ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await todoListAPI.getTodoList()
        dispatch(setTodoListAC(response.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        dispatch(setAppErrorAC(e.message))
        dispatch(setAppStatusAC('failed'))
    }
}

export const createTodoThunk = (title:string):ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await todoListAPI.createTodoList(title)
        if(response.data.resultCode === 0) {
            dispatch(createNewTodoAC(response.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e.message,dispatch)
    }
}

export const deleteTodoThunk = (id:string):ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoStatusAC(id,'loading'))
    try {
        const response = await todoListAPI.deleteTodoList(id)
        if(response.data.resultCode === 0) {
            dispatch(deleteTodoAC(id))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e.message,dispatch)
    }

}

export const updateTodoTitleThunk = (id:string, title:string):ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const response = await todoListAPI.updateTodoListTitle(id,title)
    try {
        if(response.data.resultCode === 0) {
            dispatch(updateTodoTitleAC(id,title))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e.message,dispatch)
    }
}