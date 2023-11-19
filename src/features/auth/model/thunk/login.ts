import {FieldsErrorsType} from "common/types"
import {setAppStatusAC} from "app/model/slice/app-reducer";
import {initializedTC} from "app/model/thunk/me";
import {handleNetworkError, handleServerError} from "common/utils";
import {LoginPayloadType} from "features/auth/api/authApi.types";
import { authAPI } from "features/auth";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";

export const loginTC = createAppAsyncThunk<void,LoginPayloadType,{
    rejectValue: {errors: string[],fieldsErrors?: [FieldsErrorsType]}
}>(
    'auth/login',
    async (payload,{dispatch,rejectWithValue}) => {
        dispatch(setAppStatusAC({status:"loading"}))
        try {
            const res = await authAPI.login(payload)
            if(res.data.resultCode === ResultCode.SUCCESS) {
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
