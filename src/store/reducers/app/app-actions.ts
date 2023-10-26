import {RequestStatusType} from "./app-reducer";
import {ThunkType} from "../../index";
import {authAPI} from "../../../api/auth-api";
import {setIsLoggedIn} from "../../../features/Login/auth-actions";
import {handleNetworkError, handleServerError} from "../../../utils/handleError";


export type AppActions =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setInitializedAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setInitializedAC = (value: boolean) => ({type: "APP/SET-INITIALIZED", value} as const)

export const initializedTC = (): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await authAPI.me()
        if(response.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedIn(true))
        } else {
            handleServerError(response.data,dispatch)
        }
        dispatch(setInitializedAC(true))
    } catch (e: any) {
        handleNetworkError(e.message,dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}