import {TodoActionType} from "./todo-actions";
import {TodoListReducerType} from "../../../types/todolists-types";


const initialState: TodoListReducerType[] = []

export const todoReducer = (state: TodoListReducerType[] = initialState, action: TodoActionType): TodoListReducerType[] => {
    switch (action.type) {
        case "REMOVE-TODO":
            return state.filter(t => t.id !== action.todoId)
        case "ADD-NEW-TODO":
            const newTodo:TodoListReducerType = {...action.todoList,filter:'all'}
            return [newTodo,...state]
        case "CHANGE-TODO-TITLE":
            return state.map(t => t.id === action.todoId ? {...t, title: action.title} : t)
        case "CHANGE-TODO-FILTER":
            return state.map(t => t.id === action.todoId ? {...t, filter: action.filter} : t)

        case "SET-TODOLIST":
            return action.todoList.map(tl => {
                return {
                    ...tl,
                    filter:'all'
                }
            })
        default:
            return state
    }
}