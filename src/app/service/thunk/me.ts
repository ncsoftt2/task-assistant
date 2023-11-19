import {setAppStatusAC, UserDataType} from "../slice/app-reducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {handleNetworkError, handleServerError } from "common/utils";
import {authActions, authAPI} from "features/auth";


type ValuesType = {
    value: boolean
    userData: UserDataType
}

export const initializedTC = createAsyncThunk<ValuesType | void,undefined,{
    rejectValue: {errors: string[]}
}>(
    'app/me',
    async (_,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const response = await authAPI.me()
            const values = {} as ValuesType
            if(response.data.resultCode === 0) {
                dispatch(setAppStatusAC({status:'succeeded'}))
                dispatch(authActions.setIsLoggedIn({value:true}))
                values.userData = response.data.data
            } else {
                handleServerError(response.data,dispatch)
            }
            values.value = true
            return values
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            rejectWithValue({errors: [err.message]})
        }
    }
)
