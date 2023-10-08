import {TodoListApiType} from "../api/todolist-api";

export type TodoFilterType = "all" | "active" | "completed"

export type TodoListReducerType = TodoListApiType & {
    filter: TodoFilterType
}