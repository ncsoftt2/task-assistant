import {createNewTodoAC, deleteTodoAC, setTodoListAC,} from "../todo-list/todo-list-actions";
import {TaskType, tasksAPI, TaskStatus, UpdateTaskModelType, TaskPriority} from "../../../api/task-api";
import {ThunkType} from "../../index";
import {setAppErrorAC, setAppStatusAC} from "../app/app-actions";
import {handleNetworkErrorTask, handleServerErrorTask} from "../../../utils/handleErrorTask";

export type TaskAction =
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof setTodoListAC>
    | ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof createNewTodoAC>
    | ReturnType<typeof sortTasksAC>

export const createTaskAC = (task: TaskType) => ({type: "ADD-NEW-TASK", task} as const)
export const deleteTaskAC = (todoId: string, taskId: string) => ({type: "REMOVE-TASK", todoId, taskId} as const)
export const updateTaskAC = (todoId: string, taskId: string, model: UpdateTaskModelType) => (
    {type: "CHANGE-TASK-TITLE", todoId, taskId, model} as const
)
export const sortTasksAC = (tasks:TaskType[],priority:TaskPriority,todoId:string) => (
    {type:"SORT-TASK",tasks,priority,todoId} as const)
export const setTaskAC = (todoListId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todoListId, tasks} as const)


export const getTaskThunk = (id: string): ThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(id)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTaskAC(id, res.data.items))
        })
        .catch(e => {
            handleNetworkErrorTask(e,dispatch)
        })
}

export const createTaskThunk = (id: string, title: string): ThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(id,title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(createTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerErrorTask(res.data,dispatch)
            }
        })
        .catch(e => {
            handleNetworkErrorTask(e,dispatch)
        })
}

export const deleteTaskThunk = (todoListId: string, taskId: string): ThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.deleteTask(todoListId,taskId)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todoListId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerErrorTask(res.data,dispatch)
            }
        })
        .catch(e => {
            handleNetworkErrorTask(e,dispatch)
        })
}

export const updateTaskThunk = (todoId: string, taskId: string, model: Partial<UpdateTaskModelType>): ThunkType =>
    (dispatch, getState) => {
        const state = getState()
        const task = state.tasks[todoId].find(t => t.id === taskId)
        if (!task) return
        const apiModel:UpdateTaskModelType = {
            ...task,
            ...model
        }
        dispatch(setAppStatusAC('loading'))
        tasksAPI.updateTask(todoId,taskId,apiModel)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todoId,taskId,res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerErrorTask(res.data,dispatch)
                }
            })
            .catch(e => {
                handleNetworkErrorTask(e,dispatch)
            })
            .finally(() => {
                setTimeout(() => {
                    dispatch(setAppStatusAC('idle'))
                },4000)
            })
}
