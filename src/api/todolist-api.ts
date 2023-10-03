import {instance} from "./api";

export type TodoListType = {
    id:string
    title:string
    addedDate: string
    order: number
}

export type ResponseType<D> = {
    resultCode: number
    messages: string[],
    data: D
}


export const todoListAPI = {
    async getTodoLists(){
        return await instance.get<TodoListType[]>(`/todo-lists`)
            .then(res => res.data)
    },
    async createTodoList(title:string) {
        return await instance.post<ResponseType<{ item: TodoListType }>>(`/todo-lists`, {title})
            .then(res => res.data.data.item)
    },
    async deleteTodoList(id:string) {
        return await instance.delete<ResponseType<{}>>(`/todo-lists/${id}`)
            .then(res => res.data)
    },
    async updateTodoList(id:string,title:string) {
        return await instance.put<ResponseType<{}>>(`/todo-lists/${id}`,{title})
            .then(res => res.data)
    },
}