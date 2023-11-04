import {LoginPayloadType} from "../../api/api-types";
import {ThunkType} from "../../store";
import {initializedTC, setAppStatusAC, setInitializedAC, setUserDataAC} from "../../store/reducers/app/app-reducer";
import {authAPI} from "../../api/auth-api";
import {handleNetworkError, handleServerError} from "../../utils/handleError";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearDataAC} from "../../store/reducers/todo-list/todo-list-reducer";

type InitialStateType = {
    isAuth: boolean
}
const initialState:InitialStateType = {
    isAuth: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn: (state,action:PayloadAction<{value: boolean}>) => {
            state.isAuth = action.payload.value
        }
    }
})


export const authReducer = authSlice.reducer
export const {setIsLoggedIn} = authSlice.actions

export const loginTC = (payload: LoginPayloadType): ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        const response = await authAPI.login(payload)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC({status:'succeeded'}))
            dispatch(setIsLoggedIn({value:true}))
            dispatch(initializedTC())
        } else {
            handleServerError(response.data, dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e.message, dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'idle'}))
    }
}

export const logoutTC = (): ThunkType => async dispatch => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        const response = await authAPI.logout()
        if(response.data.resultCode === 0) {
            dispatch(setAppStatusAC({status:'succeeded'}))
            dispatch(setIsLoggedIn({value:false}))
            dispatch(setInitializedAC({value:false}))
            dispatch(clearDataAC())
            dispatch(setUserDataAC(null))
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e) {
        handleNetworkError(e as {message:string},dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'failed'}))
    }
}