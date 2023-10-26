import {TaskAction} from "./task-actions";
import { TaskType} from "../../../api/task-api";
import {RequestStatusType} from "../app/app-reducer";

export type TaskDomainType = TaskType & {
    taskStatus: RequestStatusType
}

export type TasksType = {
    [key: string]: TaskDomainType[]
}

const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: TaskAction): TasksType => {
    switch (action.type) {
        case "ADD-NEW-TASK":
            const newTask:TaskDomainType = {...action.task,taskStatus: 'idle'}
            return {
                ...state,
                [newTask.todoListId]: [newTask,...state[newTask.todoListId]]
            }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {
                    ...t, ...action.model
                } : t)
            }
        case "REMOVE-TODO":
            delete state[action.todoId]
            return {...state}
        case "ADD-NEW-TODO":
            return {
                ...state,
                [action.todoList.id]: []
            }
        case "SET-TODOLIST":
            const copyState = {...state}
            action.todoList.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        case "SET-TASKS":
            return {
                ...state,
                [action.todoListId]: action.tasks.map(t => ({...t,taskStatus:'idle'}))
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => ({...t,taskStatus: action.taskStatus}))
            }
        case "SORT-TASK":
            return {
                ...state,
                [action.todoId]: action.priority > 1
                    ? [...action.tasks].sort((a,b) => a.priority - b.priority)
                    : [...action.tasks].sort((a,b) => b.priority - a.priority)
            }
        case "CLEAR-DATA":
            return {}
        default:
            return state
    }
}