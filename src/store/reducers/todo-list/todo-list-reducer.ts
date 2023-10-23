import {TodoListAction} from "./todo-list-actions";
import {TodoListType} from "../../../api/todo-list-api";
import {RequestStatusType} from "../app/app-reducer";

export type TodoFilterType = "all" | "active" | "completed"

export type TodoListReducerType = TodoListType & {
    filter: TodoFilterType,
    entityStatus: RequestStatusType
}

const initialState:TodoListReducerType[] = []

export const todoListReducer = (state:TodoListReducerType[] = initialState,action:TodoListAction):TodoListReducerType[] => {
    switch (action.type) {
        case "ADD-NEW-TODO":
            const newTodo:TodoListReducerType = {...action.todoList,filter:'all',entityStatus:'idle'}
            return [newTodo,...state]
        case "REMOVE-TODO":
            return state.filter(t => t.id !== action.todoId)
        case "CHANGE-TODO-TITLE":
            return state.map(t => t.id === action.todoId ? {...t,title:action.title} : t)
        case "CHANGE-TODO-FILTER":
            return state.map(t => t.id === action.todoId ? {...t,filter:action.filter} : t)
        case "CHANGE-TODO-STATUS":
            return state.map(t => t.id === action.todoId ? {...t,entityStatus:action.entityStatus} : t)
        case "SET-TODOLIST":
            return action.todoList.map(tl => ({...tl, filter:'all',entityStatus:'idle'}))
        default: return state
    }
}