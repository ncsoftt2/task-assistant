import {instance} from "./api";

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseTaskType = {
    items: TaskType[]
    totalCount: number
    error:string | null
}

export type ReturnTaskType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}

export const tasksAPI = {
    async getTasks(todoID:string){
        return await instance.get<ResponseTaskType>(`/todo-lists/${todoID}/tasks`)
            .then(res => res.data.items)
    },
    async createTask(todoID:string,title:string) {
        return await instance.post<ReturnTaskType<{ item: TaskType}>>(`/todo-lists/${todoID}/tasks`, {title})
            .then(res => res.data.data.item)
    },
    async deleteTask(todoID:string,taskID:string) {
        return await instance.delete<ReturnTaskType>(`/todo-lists/${todoID}/tasks/${taskID}`)
            .then(res => res.data)
    },
    async updateTask(todoID:string,taskID:string,title:string) {
        return await instance.put<ReturnTaskType<{ item: TaskType}>>(`/todo-lists/${todoID}/tasks/${taskID}`, {title})
            .then(res => res.data)
    },
}