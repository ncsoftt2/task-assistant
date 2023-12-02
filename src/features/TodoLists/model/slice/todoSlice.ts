import {RequestStatusType} from "app/app.reducer";
import {AnyAction, createSlice, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {fetchTodoTC} from "../thunk/fetchTodoList";
import {createTodoTC} from "../thunk/createTodo";
import {deleteTodoTC} from "../thunk/deleteTodo";
import {updateTodoTitleTC} from "../thunk/updateTodoTitle";
import {clearDataAC} from "common/actions/clearData";
import {TodoListType} from "features/TodoLists/api/todoApi.types";

export type TodoFilterType = "all" | "active" | "completed"
export type TodoListReducerType = TodoListType & {
    filter: TodoFilterType,
    entityStatus: RequestStatusType
}

const initialState: TodoListReducerType[] = []

const slice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        changeTodoFilterAC: (state, action: PayloadAction<{ todoId: string, filter: TodoFilterType }>) => {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl, filter: action.payload.filter} : tl)
        },
        changeTodoStatusAC: (state, action: PayloadAction<{ todoId: string, entityStatus: RequestStatusType }>) => {
            return state.map(tl => tl.id === action.payload.todoId ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearDataAC, () => {
                return []
            })
            .addCase(fetchTodoTC.fulfilled, (_, action) => {
                return action.payload.map(tl => ({...tl, entityStatus: "idle", filter: "all"}))
            })
            .addCase(createTodoTC.fulfilled, (state, action) => {
                state.unshift({...action.payload, entityStatus: 'idle', filter: "all"})
            })
            .addCase(deleteTodoTC.fulfilled, (state, {payload}) => {
                const index = state.findIndex(todo => todo.id === payload)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(updateTodoTitleTC.fulfilled, (state, {payload: {todoId, title}}) => {
                const index = state.findIndex(todo => todo.id === todoId)
                if (index !== -1) state[index].title = title
            })
            .addMatcher(isPending(todoThunks.deleteTodoTC),
                (state,action:AnyAction) => {
                const index = state.findIndex(todo => todo.id === action.meta.arg)
                if (index !== -1) {
                    state[index].entityStatus = 'loading'
                }
            })
            .addMatcher(isRejected(todoThunks.deleteTodoTC), (state, action: AnyAction) => {
                const index = state.findIndex(todo => todo.id === action.meta.arg)
                if (index !== -1) {
                    state[index].entityStatus = 'idle'
                }
            })
    }
})

export const todoReducer = slice.reducer
export const todoActionsCreators = slice.actions
export const todoThunks = {createTodoTC, fetchTodoTC, updateTodoTitleTC, deleteTodoTC}

