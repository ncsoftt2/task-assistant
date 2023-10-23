import {TaskAction} from "./task-actions";
import {TaskPriority, TaskType} from "../../../api/task-api";

export type TasksType = {
    [key: string]: TaskType[]
}

const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: TaskAction): TasksType => {
    switch (action.type) {
        case "ADD-NEW-TASK":
            const newTask:TaskType = action.task
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
                [action.todoListId]: action.tasks
            }
        // case "SORT-TASK":
        //     return {
        //         ...state,
        //         [action.todoId]: action.priority > 1
        //             ? [...action.tasks].sort((a,b) => a.priority - b.priority)
        //             : [...action.tasks].sort((a,b) => b.priority - a.priority)
        //     }
        case "SORT-TASK":
            return {
                ...state,
                [action.todoId]: action.priority > 1
                    ? [...action.tasks].sort((a,b) => a.priority - b.priority)
                    : [...action.tasks].sort((a,b) => b.priority - a.priority)
            }
        default:
            return state
    }
}