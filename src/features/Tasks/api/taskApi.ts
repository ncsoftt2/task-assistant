import {instance} from "common/api";
import {ReturnResponseType} from "common/types";
import {CreateTaskResponse, TaskResponseType, TaskType, UpdateTaskModelType} from "./taskApi.types";

export const tasksAPI = {
    getTasks(todoListId:string){
        return instance.get<TaskResponseType>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId:string,payload: CreateTaskResponse) {
        return instance.post<ReturnResponseType<{item:TaskType}>>(`/todo-lists/${todoListId}/tasks`, payload)
    },
    deleteTask(todoListId:string,taskId:string) {
        return instance.delete<ReturnResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoId:string,taskId:string,model:UpdateTaskModelType) {
        return instance.put<ReturnResponseType<{item:TaskType}>>(`/todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}