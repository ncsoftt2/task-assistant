import {ThunkType} from "../../index";
import {authAPI} from "../../../api/auth-api";
import {handleNetworkError, handleServerError} from "../../../utils/handleError";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoggedIn} from "../../../features/Login/auth-reducer";

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

const appSlice = createSlice({
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
    }
})

export const appReducer = appSlice.reducer
export const {setAppStatusAC,setInitializedAC,setAppErrorAC,setUserDataAC} = appSlice.actions


export const initializedTC = (): ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        const response = await authAPI.me()
        if(response.data.resultCode === 0) {
            dispatch(setAppStatusAC({status:'succeeded'}))
            dispatch(setIsLoggedIn({value:true}))
            dispatch(setUserDataAC(response.data.data))
        } else {
            handleServerError(response.data,dispatch)
        }
        dispatch(setInitializedAC({value:true}))
    } catch (e: any) {
        handleNetworkError(e.message,dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'idle'}))
    }
}