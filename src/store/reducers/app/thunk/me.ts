import {authAPI} from "../../../../api/auth-api";
import {setIsLoggedIn} from "../../../../features/Login/slice/auth-reducer";
import {handleNetworkError, handleServerError} from "../../../../utils/handleError";
import {setAppStatusAC, UserDataType} from "../slice/app-reducer";
import {createAsyncThunk} from "@reduxjs/toolkit";

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
                dispatch(setIsLoggedIn({value:true}))
                values.userData = response.data.data
            } else {
                handleServerError(response.data,dispatch)
            }
            values.value = true
            console.log(values)
            return values
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            rejectWithValue({errors: [err.message]})
        }
    }
)
