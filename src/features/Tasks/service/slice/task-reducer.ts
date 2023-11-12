import {TaskPriority, TaskType} from "../../../../api/task-api";
import {RequestStatusType} from "../../../../app/service/slice/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasksTC} from "../thunk/fetchTasks";
import {createTaskTC} from "../thunk/createTask";
import {deleteTaskTC} from "../thunk/deleteTask";
import {updateTaskTC} from "../thunk/updateTask";
import {fetchTodoTC} from "../../../TodoLists/service/thunk/fetchTodoList";
import {createTodoTC} from "../../../TodoLists/service/thunk/createTodo";
import {deleteTodoTC} from "../../../TodoLists/service/thunk/deleteTodo";
import {clearDataAC} from "../../../../common/actions/clearData";

export type TaskDomainType = TaskType & {
    taskStatus: RequestStatusType
}

export type TasksType = {
    [key: string]: TaskDomainType[]
}

const initialState: TasksType = {}
export const taskSlice = createSlice({
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
            .addCase(deleteTodoTC.fulfilled,(state,action) => {
            delete state[action.payload]
        })
            .addCase(createTodoTC.fulfilled,(state,action) => {
            state[action.payload.id] = []
        })
            .addCase(fetchTodoTC.fulfilled,(state,action) => {
            action.payload.forEach(tl => {
                state[tl.id] = []
            })
        })
            .addCase(fetchTasksTC.fulfilled,(state, action) => {
            if(action.payload) {
                state[action.payload.id] = action.payload.tasks.map(task => ({...task,taskStatus:'idle'}))
            }
        })
            .addCase(createTaskTC.fulfilled,(state,action) => {
            if(action.payload) {
                state[action.payload.todoListId].unshift({...action.payload,taskStatus:"idle"})
            }
        })
            .addCase(deleteTaskTC.fulfilled,(state,action) => {
            state[action.payload.todoId] = state[action.payload.todoId]
                .filter(task => task.id !== action.payload.taskId)
        })
            .addCase(updateTaskTC.pending,(state, {meta: {arg: {taskId,todoId,model}}}) => {
            state[todoId] = state[todoId]
                .map(task => task.id === taskId ? {...task,...model} : task)
        })
            .addCase(updateTaskTC.fulfilled,(state, {payload}) => {
            if(payload) {
                state[payload.todoId] = state[payload.todoId]
                    .map(task => task.id === payload.taskId ? {...task,...payload.model} : task)
            }
        })
            .addCase(updateTaskTC.rejected,(state, {meta: {arg: {taskId,todoId,model}}}) => {
            state[todoId] = state[todoId]
                .map(task => task.id === taskId ? {...task,...model} : task)
        })
    }
})

export const taskReducer = taskSlice.reducer
export const {sortTasksAC,changeTaskStatusAC} = taskSlice.actions

