import {setAppStatusAC, setInitializedAC, setUserDataAC} from "../../../../app/service/slice/app-reducer";
import {authAPI} from "../../../../api/auth-api";
import {handleNetworkError, handleServerError} from "../../../../utils/handleError";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {clearDataAC} from "../../../../common/actions/clearData";

export const logoutTC = createAsyncThunk<void,undefined,{
    rejectValue: {errors: string[]}
}>(
    'auth/logout',
    async (_,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:'loading'}))
        try {
            const response = await authAPI.logout()
            if(response.data.resultCode === 0) {
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
