import {instance} from "./api";
import {ResponseType} from "./api-types";

export type TodoListType = {
    id: string
    addedDate: Date
    order: number
    title: string
}



export const todoListAPI = {
    getTodoList(){
        return instance.get<TodoListType[]>(`/todo-lists`)
    },
    createTodoList(title:string) {
        return instance.post<ResponseType<{item:TodoListType}>>(`/todo-lists`, {title})
    },
    deleteTodoList(todoListId:string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoListTitle(todoListId:string,title:string) {
        return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
    }
}