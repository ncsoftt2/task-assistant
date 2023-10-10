import {AddNewTodoType, RemoveTodoType, SetTodoListType} from "../todos-reducer/todo-actions";
import {tasksAPI, TaskStatus, TaskType} from "../../../api/tasks-api";
import {ThunkType} from "../../index";

export type RemoveTaskType = ReturnType<typeof removeTaskAC>
export type AddNewTaskType = ReturnType<typeof addNewTaskAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

export type SetTaskType = ReturnType<typeof setTaskAC>

export type TaskActionType = AddNewTodoType | RemoveTodoType |
    RemoveTaskType | AddNewTaskType | ChangeTaskTitleType | ChangeTaskStatusType | SetTodoListType | SetTaskType

export const removeTaskAC = (todoId:string,taskId:string) => ({type:"REMOVE-TASK",todoId,taskId} as const)
export const addNewTaskAC = (todoId:string,title:string) => ({type:"ADD-NEW-TASK",todoId,title} as const)
export const changeTaskTitleAC = (todoId:string,taskId:string,title:string) => (
    {type:"CHANGE-TASK-TITLE",todoId,taskId,title} as const
)
export const changeTaskStatusAC = (todoId:string,taskId:string,status:TaskStatus) => (
    {type:"CHANGE-TASK-STATUS",todoId,taskId,status} as const
)

export const setTaskAC = (todoListId:string,tasks:TaskType[]) => ({type:"SET-TASKS",todoListId,tasks} as const)

export const getTaskThunk = (todoListId:string):ThunkType => async (dispatch) => {
    const response = await tasksAPI.getTasks(todoListId)
    dispatch(setTaskAC(todoListId,response.data.items))
}