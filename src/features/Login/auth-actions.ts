import {LoginPayloadType} from "../../api/api-types";
import {ThunkType} from "../../store";
import {setAppStatusAC, setInitializedAC} from "../../store/reducers/app/app-actions";
import {authAPI} from "../../api/auth-api";
import {handleNetworkError, handleServerError} from "../../utils/handleError";
import {clearDataAC} from "../../store/reducers/todo-list/todo-list-actions";

export type AuthActions = ReturnType<typeof setIsLoggedIn>
export const setIsLoggedIn = (value: boolean) => ({type: "SET-IS-LOGGED-IN", value} as const)

export const loginTC = (payload: LoginPayloadType): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await authAPI.login(payload)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedIn(true))
        } else {
            handleServerError(response.data, dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e.message, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const logoutTC = (): ThunkType => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const response = await authAPI.logout()
        if(response.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsLoggedIn(false))
            dispatch(setInitializedAC(false))
            dispatch(clearDataAC())
        } else {
            handleServerError(response.data,dispatch)
        }
    } catch (e: any) {
        handleNetworkError(e.message,dispatch)
    } finally {
        dispatch(setAppStatusAC('failed'))
    }
}