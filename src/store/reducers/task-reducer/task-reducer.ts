import {TaskStateType} from "../../../types/tasks-types";
import {v1} from "uuid";
import {TaskActionType} from "./task-actions";
import {TaskStatus, TaskType, TodoTaskPriority} from "../../../api/tasks-api";

const initialState: TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState, action: TaskActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoId]: state[action.todoId].filter(t => t.id !== action.taskId)
            }
        case "ADD-NEW-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatus.New,
                priority: TodoTaskPriority.Low,
                addedDate: "",
                deadline: "",
                description:"",
                order: 0,
                startDate: "",
                todoListId: action.todoId
            }
            return {
                ...state,
                [action.todoId]: [...state[action.todoId], newTask]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {
                    ...t, title: action.title
                } : t)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {
                    ...t, status: action.status
                } : t)
            }
        case "ADD-NEW-TODO":
            return {
                ...state,
                [action.todoId]: []
            }
        case "REMOVE-TODO":
            delete state[action.todoId]
            return {...state}
        default:
            return state
    }
}