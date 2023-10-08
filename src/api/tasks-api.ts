import {instance} from "./api";

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TodoTaskPriority {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title:  string
    status: TaskStatus
    priority: TodoTaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseTaskType = {
    items: TaskType[]
    error: string
    totalCount: number
}

type TaskTypeApi<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

export const tasksAPI = {
    async getTasks(todoId:string){
        return await instance.get<ResponseTaskType>(`/todo-lists/${todoId}/tasks`)
    },
    async createTask(todoId:string,title:string) {
        return await instance.post<TaskTypeApi<{item:TaskType}>>(`/todo-lists/${todoId}/tasks`, {title})
    },
    async deleteTask(todoId:string,taskId:string) {
        return await instance.delete<TaskTypeApi>(`/todo-lists/${todoId}/tasks/${taskId}`)
    },
    async updateTask(todoId:string,taskId:string,title:string) {
        return await instance.put<TaskTypeApi<{item:TaskType}>>(`/todo-lists/${todoId}/tasks/${taskId}`,{title})
    }
}