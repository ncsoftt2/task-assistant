import {handleServerError} from "common/utils";
import {LoginPayloadType} from "features/auth/api/authApi.types";
import { authAPI } from "features/auth";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";
import {appActions} from "app/app.reducer";
import {authThunks, UserDataType} from "features/auth/model/slice/auth.reducer";
import {thunkTryCatch} from "common/utils/thunkTryCatch";

export const login = createAppAsyncThunk<UserDataType,LoginPayloadType>(
    'auth/login',
    async (payload,thunkAPI) => {
        const {dispatch,rejectWithValue} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const res = await authAPI.login(payload)
            if(res.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatusAC({status:'succeeded'}))
                dispatch(authThunks.initializeMe())
                return {email: payload.email}
            } else {
                const isShowAppError = !res.data.fieldsErrors.length
                handleServerError(res.data,dispatch,isShowAppError)
                return rejectWithValue(res.data)
            }
        })
    }
)

// export const login = createAppAsyncThunk<UserDataType,LoginPayloadType,{
//     rejectValue: {errors: string[],fieldsErrors?: [FieldsErrorsType]} | null
// }>(
//     'auth/login',
//     async (payload,{dispatch,rejectWithValue}) => {
//         dispatch(appActions.setAppStatusAC({status:"loading"}))
//         try {
//             const res = await authAPI.login(payload)
//             if(res.data.resultCode === ResultCode.SUCCESS) {
//                 dispatch(appActions.setAppStatusAC({status:'succeeded'}))
//                 dispatch(authThunks.initializeMe())
//                 return {email: payload.email}
//             } else {
//                 const isShowAppError = !res.data.fieldsErrors.length
//                 handleServerError(res.data,dispatch,isShowAppError)
//                 return rejectWithValue({errors: res.data.messages,fieldsErrors:res.data.fieldsErrors})
//             }
//         } catch (e) {
//             handleNetworkError(e,dispatch)
//             return rejectWithValue(null)
//         }
//     }
// )
