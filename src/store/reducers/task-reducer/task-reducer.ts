import {TaskStateType} from "../../../types/tasks-types";
import {v1} from "uuid";
import {TaskActionType} from "./task-actions";
import {TaskStatus, TaskType, TodoTaskPriority} from "../../../api/tasks-api";

const initialState: TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState, action: TaskActionType): TaskStateType => {
    switch (action.type) {
        case "DELETE-TASK":
            return {
                ...state,
                [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)
            }
        case "CREATE-TASK":
            const newTask: TaskType = action.task
            return {
                ...state,
                [newTask.todoListId]: [newTask,...state[newTask.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {
                    ...t, ...action.model
                } : t)
            }
        case "ADD-NEW-TODO":
            return {
                ...state,
                [action.todoList.id]: []
            }
        case "REMOVE-TODO":
            delete state[action.todoId]
            return {...state}

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
        default:
            return state
    }
}