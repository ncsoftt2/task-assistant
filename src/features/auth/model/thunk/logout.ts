import {setAppStatusAC, setInitializedAC, setUserDataAC} from "app/model/slice/app-reducer";
import {handleNetworkError, handleServerError} from "common/utils";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {clearDataAC} from "common/actions/clearData";
import { authAPI } from "features/auth";
import {ResultCode} from "common/enums";

export const logoutTC = createAsyncThunk<void,undefined,{
    rejectValue: {errors: string[]}
}>(
    'auth/logout',
    async (_,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const response = await authAPI.logout()
            if(response.data.resultCode === ResultCode.SUCCESS) {
                dispatch(setAppStatusAC({status:'succeeded'}))
                dispatch(setInitializedAC({value:false}))
                dispatch(clearDataAC())
                dispatch(setUserDataAC(null))
            } else {
                handleServerError(response.data,dispatch)
                rejectWithValue({errors: response.data.messages})
            }
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            rejectWithValue({errors: [err.message]})
        }
    }
)
