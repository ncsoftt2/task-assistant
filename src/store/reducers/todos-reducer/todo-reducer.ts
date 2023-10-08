import {TodoActionType} from "./todo-actions";
import {TodoListReducerType} from "../../../types/todolists-types";


const initialState: TodoListReducerType[] = []

export const todoReducer = (state: TodoListReducerType[] = initialState, action: TodoActionType): TodoListReducerType[] => {
    switch (action.type) {
        case "REMOVE-TODO":
            return state.filter(t => t.id !== action.todoId)
        case "ADD-NEW-TODO":
            const newTodo:TodoListReducerType = {
                id: action.todoId,
                title: action.title,
                filter: "all",
                addedDate:"",
                order:0
            }
            return [...state, newTodo]
        case "CHANGE-TODO-TITLE":
            return state.map(t => t.id === action.todoId ? {...t, title: action.title} : t)
        case "CHANGE-TODO-FILTER":
            return state.map(t => t.id === action.todoId ? {...t, filter: action.filter} : t)
        default:
            return state
    }
}