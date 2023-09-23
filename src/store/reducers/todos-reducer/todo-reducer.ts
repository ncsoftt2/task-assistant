import { v1 } from "uuid";
import {TodoListType, TodoType} from "../../../types/todos-types";
import {TodoActionType} from "./todo-actions";


const initialState:TodoListType = {
    todoList: []
}

export const todoReducer = (state:TodoListType = initialState,action:TodoActionType):TodoListType => {
    switch (action.type) {
        case "REMOVE-TODO":
            return {
                ...state,
                todoList: state.todoList.filter(t => t.id !== action.todoId)
            }
        case "ADD-NEW-TODO":
            const newTodo:TodoType = {id:action.todoId,title:action.title,filter:"all"}
            return {
                ...state,
                todoList: [...state.todoList,newTodo]
            }
        case "CHANGE-TODO-TITLE":
            return {
                ...state,
                todoList: state.todoList.map(t => t.id === action.todoId ? {...t,title:action.title} : t)
            }
            case "CHANGE-TODO-FILTER":
            return {
                ...state,
                todoList: state.todoList.map(t => t.id === action.todoId ? {...t,filter:action.filter} : t)
            }
        default: return state
    }
}