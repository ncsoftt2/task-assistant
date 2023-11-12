import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializedTC} from "../thunk/me";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type UserDataType = {
    id: number | null
    login: string | null
    email: string | null
}

export type AppInitialStateType = {
    error: string | null
    status: RequestStatusType
    initialized: boolean
    userData: UserDataType | null
}

const initialState:AppInitialStateType = {
    status: 'idle',
    error: null,
    initialized: false,
    userData: {} as UserDataType | null
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
        },
        setUserDataAC: (state,action:PayloadAction<UserDataType | null>) => {
            state.userData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(initializedTC.fulfilled,(state,action) => {
            if(action.payload) {
                state.userData = action.payload.userData ? action.payload.userData : {} as UserDataType
                state.initialized = action.payload.value
            }
        })
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC,setInitializedAC,setAppErrorAC,setUserDataAC} = slice.actions
