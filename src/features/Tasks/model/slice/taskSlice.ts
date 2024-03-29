import {RequestStatusType} from "app/app.reducer";
import {createSlice, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasks} from "../thunk/fetchTasks";
import {createTask} from "../thunk/createTask";
import {deleteTask} from "../thunk/deleteTask";
import {updateTask} from "../thunk/updateTask";
import {clearDataAC} from "common/actions/clearData";
import {todoListActions} from "features/TodoLists";
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
        changeTaskStatusAC: (state, action: PayloadAction<{
            todoId: string,
            taskId: string,
            taskStatus: RequestStatusType
        }>) => {
            state[action.payload.todoId] = state[action.payload.todoId]
                .map(task => task.id === action.payload.taskId ? {
                    ...task,
                    taskStatus: action.payload.taskStatus
                } : task)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(clearDataAC, () => {
                return {}
            })
            .addCase(todoListActions.deleteTodoTC.fulfilled, (state, action) => {
                delete state[action.payload]
            })
            .addCase(todoListActions.createTodoTC.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(todoListActions.fetchTodoTC.fulfilled, (state, action) => {
                action.payload.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.id] = action.payload.tasks.map(task => ({...task, taskStatus: 'idle'}))
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift({...action.payload, taskStatus: "idle"})

            })
            .addCase(deleteTask.fulfilled, (state, {payload: {taskId, todoId}}) => {
                const index = state[todoId].findIndex(t => t.id === taskId)
                if (index !== -1) {
                    state[todoId].splice(index, 1)
                }
            })
            .addCase(updateTask.fulfilled, (state, {payload}) => {
                const index = state[payload.todoId].findIndex(t => t.id === payload.taskId)
                if (index !== -1) {
                    state[payload.todoId][index] = {...state[payload.todoId][index], ...payload.model}
                    state[payload.todoId][index].taskStatus = 'succeeded'
                }
            })
            .addMatcher(isPending(tasksThunks.deleteTask, tasksThunks.updateTask), (state, {meta}) => {
                const {arg: {todoId, taskId}} = meta
                const index = state[todoId].findIndex(task => task.id === taskId)
                if (index !== -1) {
                    state[todoId][index].taskStatus = 'loading'
                }
            })
            .addMatcher(isRejected(tasksThunks.deleteTask, tasksThunks.updateTask), (state, {meta}) => {
                const {arg: {todoId, taskId}} = meta
                const index = state[todoId].findIndex(task => task.id === taskId)
                if (index !== -1) {
                    state[todoId][index].taskStatus = 'idle'
                }
            })
    }
})

export const taskReducer = slice.reducer
export const tasksActionsCreators = slice.actions
export const tasksThunks = {createTask, deleteTask, updateTask, fetchTasks}

