import {FieldsErrorsType, LoginPayloadType} from "../../../api/api-types";
import {setAppStatusAC} from "../../../store/reducers/app/slice/app-reducer";
import {authAPI} from "../../../api/auth-api";
import {handleNetworkError, handleServerError} from "../../../utils/handleError";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {initializedTC} from "../../../store/reducers/app/thunk/me";

export const loginTC = createAsyncThunk<undefined,LoginPayloadType,{
    rejectValue: {errors: string[],fieldsErrors?: [FieldsErrorsType]}
}>(
    'auth/login',
    async (payload,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:"loading"}))
        try {
            const res = await authAPI.login(payload)
            if(res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status:'succeeded'}))
                await dispatch(initializedTC())
            } else {
                handleServerError(res.data,dispatch)
                return rejectWithValue({errors: res.data.messages,fieldsErrors:res.data.fieldsErrors})
            }
        } catch (e) {
            const err = e as {message: string}
            handleNetworkError(err,dispatch)
            return rejectWithValue({errors:[err.message]})
        }
    }
)
