import {TaskPriority, TaskStatus} from "common/enums";

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

export type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type CreateTaskResponse = {
    title: string
    description: string
    priority: TaskPriority
    deadline: Date
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    startDate: Date
    deadline: Date
}
