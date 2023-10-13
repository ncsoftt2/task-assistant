import {TodoFilterType} from "../../../types/todolists-types";
import {todoListAPI, TodoListApiType} from "../../../api/todolist-api";
import {ThunkType} from "../../index";

export type TodoActionType =
    | ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof createTodoAC>
    | ReturnType<typeof changeTodoTitleAC>
    | ReturnType<typeof changeTodoFilterAC>
    | ReturnType<typeof setTodoListAC>

export const deleteTodoAC = (todoId:string) => ({type:"REMOVE-TODO",todoId} as const)
export const createTodoAC = (todoList:TodoListApiType) => ({type:"ADD-NEW-TODO",todoList} as const)
export const changeTodoTitleAC = (todoId:string,title:string) => (
    {type:"CHANGE-TODO-TITLE",title,todoId} as const
)
export const changeTodoFilterAC = (todoId:string,filter:TodoFilterType) => (
    {type:"CHANGE-TODO-FILTER",filter,todoId} as const
)

export const setTodoListAC = (todoList:TodoListApiType[]) => ({type:"SET-TODOLIST",todoList} as const)

export const getTodoListThunk = ():ThunkType => async (dispatch) => {
    const response = await todoListAPI.getTodoLists()
    dispatch(setTodoListAC(response.data))
}

export const createTodoListThunk = (title:string):ThunkType => async dispatch => {
    const response = await todoListAPI.createTodoList(title)
    if(response.data.resultCode === 0) {
        dispatch(createTodoAC(response.data.data.item))
    }
}

export const deleteTodoListThunk = (todoId:string):ThunkType => async dispatch => {
    const response = await todoListAPI.deleteTodoList(todoId)
    if(response.data.resultCode === 0) {
        dispatch(deleteTodoAC(todoId))
    }
}

export const updateTodoTitleThunk = (todoId:string,title:string):ThunkType => async dispatch => {
    const response = await todoListAPI.updateTodoList(todoId,title)
    if(response.data.resultCode === 0) {
        dispatch(changeTodoTitleAC(todoId,title))
    }
}