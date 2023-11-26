import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialStateType = {
    error: string | null
    status: RequestStatusType
    initialized: boolean
}

const initialState:AppInitialStateType = {
    status: 'idle',
    error: null,
    initialized: false,
}

export const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppStatusAC: (state,action:PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state,action:PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setInitializedAC: (state,action:PayloadAction<{value: boolean}>) => {
            state.initialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions
