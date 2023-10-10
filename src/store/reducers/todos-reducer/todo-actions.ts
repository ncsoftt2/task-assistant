import {v1} from "uuid";
import {TodoFilterType} from "../../../types/todolists-types";
import {todoListAPI, TodoListApiType} from "../../../api/todolist-api";
import {ThunkType} from "../../index";

export type RemoveTodoType = ReturnType<typeof removeTodoAC>
export type AddNewTodoType = ReturnType<typeof addNewTodoAC>
export type ChangeTodoTitleType = ReturnType<typeof changeTodoTitleAC>
export type ChangeTodoFilterType = ReturnType<typeof changeTodoFilterAC>
export type SetTodoListType = ReturnType<typeof setTodoListAC>

export type TodoActionType = RemoveTodoType | AddNewTodoType | ChangeTodoTitleType | ChangeTodoFilterType
| SetTodoListType

export const removeTodoAC = (todoId:string) => ({type:"REMOVE-TODO",todoId} as const)
export const addNewTodoAC = (title:string) => ({type:"ADD-NEW-TODO",title,todoId:v1()} as const)
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