import {instance} from "./api";
import {ResponseType} from "./api-types";

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriority {
    Low = 1,
    Middle = 2,
    High = 3,
    Later = 4,
    Urgently = 5
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    startDate: Date
    deadline: Date
}


export const tasksAPI = {
    getTasks(todoListId:string){
        return instance.get<TaskResponseType>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId:string,title:string) {
        return instance.post<ResponseType<{item:TaskType}>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId:string,taskId:string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoId:string,taskId:string,model:UpdateTaskModelType) {
        return instance.put<ResponseType<{item:TaskType}>>(`/todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}