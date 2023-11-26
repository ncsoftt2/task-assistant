import {instance} from "common/api";
import {BaseResponseType} from "common/types";
import { TodoListType } from "./todoApi.types";

export const todoListAPI = {
    getTodoList(){
        return instance.get<TodoListType[]>(`/todo-lists`)
    },
    createTodoList(title:string) {
        return instance.post<BaseResponseType<{item:TodoListType}>>(`/todo-lists`, {title})
    },
    deleteTodoList(todoListId:string) {
        return instance.delete<BaseResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoListTitle(todoListId:string,title:string) {
        return instance.put<BaseResponseType>(`/todo-lists/${todoListId}`, {title})
    }
}