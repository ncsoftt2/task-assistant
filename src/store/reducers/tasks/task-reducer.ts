import {TaskPriority, tasksAPI, TaskType, UpdateTaskModelType} from "../../../api/task-api";
import {RequestStatusType, setAppStatusAC} from "../app/app-reducer";
import {ThunkType} from "../../index";
import {handleNetworkError, handleServerError} from "../../../utils/handleError";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearDataAC, createNewTodoAC, deleteTodoAC, setTodoListAC} from "../todo-list/todo-list-reducer";

export type TaskDomainType = TaskType & {
    taskStatus: RequestStatusType
}

export type TasksType = {
    [key: string]: TaskDomainType[]
}

const initialState: TasksType = {}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTaskAC: (state,action:PayloadAction<{todoListId: string, tasks: TaskType[]}>) => {
            state[action.payload.todoListId] = action.payload.tasks.map(task => ({...task,taskStatus:'idle'}))
        },
        createTaskAC: (state,action:PayloadAction<TaskType>) => {
            state[action.payload.todoListId].unshift({...action.payload,taskStatus:"idle"})
        },
        deleteTaskAC: (state,action:PayloadAction<{todoId: string, taskId: string}>) => {
            state[action.payload.todoId] = state[action.payload.todoId].filter(task => task.id !== action.payload.taskId)
        },
        updateTaskAC: (state,action:PayloadAction<{todoId: string, taskId: string, model: UpdateTaskModelType}>) => {
            state[action.payload.todoId] = state[action.payload.todoId]
                .map(task => task.id === action.payload.taskId ? {...task,...action.payload.model} : task)
        },
        sortTasksAC: (state,action:PayloadAction<{tasks:TaskDomainType[],priority:TaskPriority,todoId:string}>) => {
            state[action.payload.todoId] = action.payload.priority > 1
                ? [...action.payload.tasks].sort((a,b) => a.priority - b.priority)
                : [...action.payload.tasks].sort((a,b) => b.priority - a.priority)
        },
        changeTaskStatusAC: (state,action:PayloadAction<{todoListId:string,taskId:string,taskStatus:RequestStatusType}>) => {
            state[action.payload.todoListId] = state[action.payload.todoListId]
                .map(task => task.id === action.payload.taskId ? {...task,taskStatus: action.payload.taskStatus} : task)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(clearDataAC,() => {
            return {}
        })
        builder.addCase(deleteTodoAC,(state,action) => {
            delete state[action.payload.todoId]
        })
        builder.addCase(createNewTodoAC,(state,action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(setTodoListAC,(state,action) => {
            action.payload.todoList.forEach(tl => {
                state[tl.id] = []
            })
        })
    }
})



export const taskReducer = taskSlice.reducer
export const {setTaskAC,deleteTaskAC,createTaskAC,
    updateTaskAC,sortTasksAC,changeTaskStatusAC} = taskSlice.actions


export const getTaskThunk = (id: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        const response = await tasksAPI.getTasks(id)
        dispatch(setTaskAC({todoListId:id,tasks:response.data.items}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    } catch (e: any) {
        handleNetworkError(e,dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'idle'}))
    }
}

export const createTaskThunk = (id: string, title: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        const response = await tasksAPI.createTask(id,title)
        if(response.data.resultCode === 0) {
            dispatch(createTaskAC(response.data.data.item))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e,dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'idle'}))
    }
}

export const deleteTaskThunk = (todoListId: string, taskId: string): ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        const response = await tasksAPI.deleteTask(todoListId,taskId)
        if(response.data.resultCode === 0) {
            dispatch(deleteTaskAC({taskId:taskId,todoId:todoListId}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e,dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'idle'}))
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
        dispatch(changeTaskStatusAC({todoListId:todoId,taskId,taskStatus:'loading'}))
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const response = await tasksAPI.updateTask(todoId,taskId,apiModel)
            if(response.data.resultCode === 0) {
                dispatch(updateTaskAC({todoId:todoId, taskId:taskId, model:response.data.data.item}))
                dispatch(changeTaskStatusAC({todoListId:todoId,taskId,taskStatus:'succeeded'}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerError(response.data,dispatch)
            }
        } catch (e:any) {
            handleNetworkError(e,dispatch)
        } finally {
            dispatch(setAppStatusAC({status:'idle'}))
            setTimeout(() => {
                dispatch(changeTaskStatusAC({todoListId:todoId,taskId, taskStatus:'idle'}))
            },4000)
        }
    }
