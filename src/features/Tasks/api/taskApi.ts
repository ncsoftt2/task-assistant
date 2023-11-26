import {instance} from "common/api";
import {BaseResponseType} from "common/types";
import {CreateTaskResponse, TaskResponseType, TaskType, UpdateTaskModelType} from "./taskApi.types";


export type DeleteTaskArgType = { todoId: string, taskId: string }

export const tasksAPI = {
    getTasks(todoListId:string){
        return instance.get<TaskResponseType>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId:string,payload: CreateTaskResponse) {
        return instance.post<BaseResponseType<{item:TaskType}>>(`/todo-lists/${todoListId}/tasks`, payload)
    },
    deleteTask(payload: DeleteTaskArgType) {
        return instance.delete<BaseResponseType>(`/todo-lists/${payload.todoId}/tasks/${payload.taskId}`)
    },
    updateTask(todoId:string,taskId:string,model:UpdateTaskModelType) {
        return instance.put<BaseResponseType<{item:TaskType}>>(`/todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}