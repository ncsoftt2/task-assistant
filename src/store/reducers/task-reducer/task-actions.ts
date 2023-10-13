import {
    createTodoAC, deleteTodoAC, setTodoListAC,
} from "../todos-reducer/todo-actions";
import {tasksAPI, TaskStatus, TaskType, TodoTaskPriority, UpdateTaskModelType} from "../../../api/tasks-api";
import {ThunkType} from "../../index";


export type TaskActionType =
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof createTodoAC>
    | ReturnType<typeof deleteTodoAC>
    | ReturnType<typeof setTodoListAC>

export const deleteTaskAC = (todoId: string, taskId: string) => ({type: "DELETE-TASK", todoId, taskId} as const)
export const createTaskAC = (task: TaskType) => ({type: "CREATE-TASK", task} as const)
export const updateTaskAC = (todoId: string, taskId: string, model: UpdateTaskModelType) => (
    {type: "UPDATE-TASK", todoId, taskId, model} as const
)

export const setTaskAC = (todoListId: string, tasks: TaskType[]) => ({type: "SET-TASKS", todoListId, tasks} as const)

export const getTaskThunk = (todoListId: string): ThunkType => async (dispatch) => {
    const response = await tasksAPI.getTasks(todoListId)
    dispatch(setTaskAC(todoListId, response.data.items))
}

export const createTaskThunk = (todoId: string, title: string): ThunkType => async dispatch => {
    const response = await tasksAPI.createTask(todoId, title)
    if (response.data.resultCode === 0) {
        dispatch(createTaskAC(response.data.data.item))
    }
}

export const deleteTaskThunk = (todoId: string, taskId: string): ThunkType => async dispatch => {
    const response = await tasksAPI.deleteTask(todoId, taskId)
    if (response.data.resultCode === 0) {
        dispatch(deleteTaskAC(todoId, taskId))
    }
}


export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TodoTaskPriority
    startDate?: string
    deadline?: string
}


export const updateTaskThunk = (todoId: string, taskId: string, model: UpdateTaskDomainModelType): ThunkType =>
    async (dispatch, getState) => {
        const state = getState()
        const task = state.tasks[todoId].find(t => t.id === taskId)
        if(!task) return
        const apiModel:UpdateTaskModelType = {
            title: task.title,
            status:task.status,
            startDate:task.startDate,
            priority:task.priority,
            description:task.description,
            deadline:task.deadline,
            ...model
        }
        const response = await tasksAPI.updateTask(todoId,taskId,apiModel)
        if(response.data.resultCode === 0) {
            dispatch(updateTaskAC(todoId,taskId,response.data.data.item))
        }
    }