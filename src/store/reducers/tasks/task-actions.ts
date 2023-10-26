import {clearDataAC, createNewTodoAC, deleteTodoAC, setTodoListAC,} from "../todo-list/todo-list-actions";
import {TaskType, tasksAPI, UpdateTaskModelType, TaskPriority} from "../../../api/task-api";
import {ThunkType} from "../../index";
import {setAppStatusAC} from "../app/app-actions";
import {handleNetworkError, handleServerError} from "../../../utils/handleError";
import {RequestStatusType} from "../app/app-reducer";
import {TaskDomainType} from "./task-reducer";

export type TaskAction =
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof setTodoListAC>
    | ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof createNewTodoAC>
    | ReturnType<typeof sortTasksAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof clearDataAC>
export const createTaskAC = (task: TaskType) => ({type: "ADD-NEW-TASK", task} as const)
export const deleteTaskAC = (todoId: string, taskId: string) => ({type: "REMOVE-TASK", todoId, taskId} as const)
export const updateTaskAC = (todoId: string, taskId: string, model: UpdateTaskModelType) => (
    {type: "CHANGE-TASK-TITLE", todoId, taskId, model} as const
)
export const sortTasksAC = (tasks:TaskDomainType[],priority:TaskPriority,todoId:string) => (
    {type:"SORT-TASK",tasks,priority,todoId} as const)
export const setTaskAC = (todoListId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todoListId, tasks} as const)
export const changeTaskStatusAC = (todoListId:string,taskStatus:RequestStatusType) => (
    {type: 'CHANGE-TASK-STATUS', todoListId, taskStatus} as const)


export const getTaskThunk = (id: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await tasksAPI.getTasks(id)
        dispatch(setTaskAC(id,response.data.items))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        handleNetworkError(e,dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const createTaskThunk = (id: string, title: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await tasksAPI.createTask(id,title)
        if(response.data.resultCode === 0) {
            dispatch(createTaskAC(response.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e,dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const deleteTaskThunk = (todoListId: string, taskId: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await tasksAPI.deleteTask(todoListId,taskId)
        if(response.data.resultCode === 0) {
            dispatch(deleteTaskAC(todoListId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e,dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const updateTaskThunk = (todoId: string, taskId: string, model: Partial<UpdateTaskModelType>): ThunkType =>
    async (dispatch, getState) => {
        const state = getState()
        const task = state.tasks[todoId].find(t => t.id === taskId)
        if (!task) return
        const apiModel:UpdateTaskModelType = {
            ...task,
            ...model
        }
        dispatch(changeTaskStatusAC(todoId,'loading'))
        dispatch(setAppStatusAC('loading'))
        try {
            const response = await tasksAPI.updateTask(todoId,taskId,apiModel)
            if(response.data.resultCode === 0) {
                dispatch(updateTaskAC(todoId,taskId,response.data.data.item))
                dispatch(changeTaskStatusAC(todoId,'succeeded'))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerError(response.data,dispatch)
            }
        } catch (e:any) {
            handleNetworkError(e,dispatch)
        } finally {
            dispatch(setAppStatusAC('idle'))
            setTimeout(() => {
                dispatch(changeTaskStatusAC(todoId,'idle'))
            },4000)
        }
}
