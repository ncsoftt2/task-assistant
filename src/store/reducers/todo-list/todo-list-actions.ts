import {TodoFilterType} from "./todo-list-reducer";
import {todoListAPI, TodoListType} from "../../../api/todo-list-api";
import {ThunkType} from "../../index";
import {setAppErrorAC, setAppStatusAC} from "../app/app-actions";
import {RequestStatusType} from "../app/app-reducer";

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

export const getTodoThunk = ():ThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.getTodoList()
        .then(res => {
            dispatch(setTodoListAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            dispatch(setAppErrorAC(e.message))
            dispatch(setAppStatusAC('failed'))
        })
}

export const createTodoThunk = (title:string):ThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.createTodoList(title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(createNewTodoAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if(res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Max length 100'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch(e => {
            dispatch(setAppErrorAC(e.message))
            dispatch(setAppStatusAC('failed'))
        })
}

export const deleteTodoThunk = (id:string):ThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoStatusAC(id,'loading'))
    todoListAPI.deleteTodoList(id)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTodoAC(id))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if(res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Try later...'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch(e => {
            dispatch(setAppErrorAC(e.message))
            dispatch(setAppStatusAC('failed'))
        })
}

export const updateTodoTitleThunk = (id:string, title:string):ThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.updateTodoListTitle(id,title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(updateTodoTitleAC(id,title))
            } else {
                if(res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Max length 100'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
}