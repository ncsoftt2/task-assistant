import {instance} from "common/api";
import {ReturnResponseType} from "common/types";
import { TodoListType } from "./todoApi.types";

export const todoListAPI = {
    getTodoList(){
        return instance.get<TodoListType[]>(`/todo-lists`)
    },
    createTodoList(title:string) {
        return instance.post<ReturnResponseType<{item:TodoListType}>>(`/todo-lists`, {title})
    },
    deleteTodoList(todoListId:string) {
        return instance.delete<ReturnResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoListTitle(todoListId:string,title:string) {
        return instance.put<ReturnResponseType>(`/todo-lists/${todoListId}`, {title})
    }
}