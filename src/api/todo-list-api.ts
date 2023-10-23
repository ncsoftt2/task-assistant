import {instance} from "./api";

export type TodoListType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

export type TodoListResponseType<D = {}> = {
    data: D
    messages: string[]
    resultCode: number
}

export const todoListAPI = {
    getTodoList(){
        return instance.get<TodoListType[]>(`/todo-lists`)
    },
    createTodoList(title:string) {
        return instance.post<TodoListResponseType<{item:TodoListType}>>(`/todo-lists`, {title})
    },
    deleteTodoList(todoListId:string) {
        return instance.delete<TodoListResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoListTitle(todoListId:string,title:string) {
        return instance.put<TodoListResponseType>(`/todo-lists/${todoListId}`, {title})
    }
}