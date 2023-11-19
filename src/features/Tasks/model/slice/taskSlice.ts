import {TaskPriority} from "common/enums";
import {RequestStatusType} from "app/model/slice/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasksTC} from "../thunk/fetchTasks";
import {createTaskTC} from "../thunk/createTask";
import {deleteTaskTC} from "../thunk/deleteTask";
import {updateTaskTC} from "../thunk/updateTask";
import {clearDataAC} from "common/actions/clearData";
import { todoListActions } from "features/TodoLists";
import {TaskType} from "features/Tasks/api/taskApi.types";

export type TaskDomainType = TaskType & {
    taskStatus: RequestStatusType
}

export type TasksType = {
    [key: string]: TaskDomainType[]
}

const initialState: TasksType = {}
const slice = createSlice({
    name: "task",
    initialState,
    reducers: {
        sortTasksAC: (state,action:PayloadAction<{tasks:TaskDomainType[],priority:TaskPriority,todoId:string}>) => {
            state[action.payload.todoId] = action.payload.priority > 1
                ? [...action.payload.tasks].sort((a,b) => a.priority - b.priority)
                : [...action.payload.tasks].sort((a,b) => b.priority - a.priority)
        },
        changeTaskStatusAC: (state,action:PayloadAction<{todoId:string,taskId:string,taskStatus:RequestStatusType}>) => {
            state[action.payload.todoId] = state[action.payload.todoId]
                .map(task => task.id === action.payload.taskId ? {...task,taskStatus: action.payload.taskStatus} : task)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(clearDataAC,() => {
            return {}
        })
            .addCase(todoListActions.deleteTodoTC.fulfilled,(state,action) => {
            delete state[action.payload]
        })
            .addCase(todoListActions.createTodoTC.fulfilled,(state,action) => {
            state[action.payload.id] = []
        })
            .addCase(todoListActions.fetchTodoTC.fulfilled,(state,action) => {
            action.payload.forEach(tl => {
                state[tl.id] = []
            })
        })
            .addCase(fetchTasksTC.fulfilled,(state, action) => {
                state[action.payload.id] = action.payload.tasks.map(task => ({...task,taskStatus:'idle'}))
        })
            .addCase(createTaskTC.fulfilled,(state,action) => {
                state[action.payload.todoListId].unshift({...action.payload,taskStatus:"idle"})

        })
            .addCase(deleteTaskTC.fulfilled,(state, {payload: {taskId,todoId}}) => {
                const index = state[todoId].findIndex(t => t.id === taskId)
                if(index !== -1) {
                    state[todoId].splice(index,1)
                }
        })
        //     .addCase(updateTaskTC.pending,(state, {meta: {arg: {taskId,todoId,model}}}) => {
        //     state[todoId] = state[todoId]
        //         .map(task => task.id === taskId ? {...task,...model} : task)
        // })
            .addCase(updateTaskTC.fulfilled,(state, {payload}) => {
                if(payload) {
                    const index = state[payload.todoId].findIndex(t => t.id === payload.taskId)
                    if(index !== -1) {
                        state[payload.todoId][index] = {...state[payload.todoId][index],...payload.model}
                    }
                }
        })
        //     .addCase(updateTaskTC.rejected,(state, {meta: {arg: {taskId,todoId,model}}}) => {
        //     state[todoId] = state[todoId]
        //         .map(task => task.id === taskId ? {...task,...model} : task)
        // })
    }
})

export const taskReducer = slice.reducer
export const tasksActionsCreators = slice.actions
export const tasksThunks = {createTaskTC,deleteTaskTC,updateTaskTC,fetchTasksTC}

