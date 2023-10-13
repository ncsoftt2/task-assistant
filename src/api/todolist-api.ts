import {instance} from "./api";


export type TodoListApiType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseTodoListType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
    fieldsErrors: string[]
}

export const todoListAPI = {
    async getTodoLists(){
        return await instance.get<TodoListApiType[]>(`/todo-lists`)
    },
    async createTodoList(title:string){
        return await instance.post<ResponseTodoListType<{item:TodoListApiType}>>(`/todo-lists`,{title})
    },
    async deleteTodoList(todoId:string){
        return await instance.delete<ResponseTodoListType>(`/todo-lists/${todoId}`)
    },
    async updateTodoList(todoId:string,title:string){
        return await instance.put<ResponseTodoListType<{item: TodoListApiType}>>(`todo-lists/${todoId}`, {title})
    }
}