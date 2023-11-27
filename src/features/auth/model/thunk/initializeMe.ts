import {appActions} from "app/app.reducer";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";
import {authAPI} from "features/auth/api/authApi";
import {UserDataType} from "features/auth/model/slice/auth.reducer";
import {ResultCode} from "common/enums";
import {thunkTryCatch} from "common/utils/thunkTryCatch";

export const initializeMe = createAppAsyncThunk<UserDataType | null,undefined>(
    'app/initializeMe',
    async (_,thunkAPI) => {
        const {dispatch} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const response = await authAPI.me()
            if(response.data.resultCode === ResultCode.SUCCESS) {
                return response.data.data
            } else {
                return null
            }
        }).finally(() => {
            dispatch(appActions.setInitializedAC({value: true}))
        })
    }
)

// export const _initializeMe = createAppAsyncThunk<UserDataType | null,undefined,{
//     rejectValue: {errors: string[]} | null
// }>(
//     'app/initializeMe',
//     async (_,{dispatch,rejectWithValue}) => {
//         dispatch(appActions.setAppStatusAC({status:'loading'}))
//         try {
//             const response = await authAPI.me()
//             if(response.data.resultCode === ResultCode.SUCCESS) {
//                 dispatch(appActions.setAppStatusAC({status:'succeeded'}))
//                 return response.data.data
//             } else {
//                 handleServerError(response.data,dispatch,false)
//                 return null
//             }
//         } catch (e) {
//             handleNetworkError(e,dispatch)
//             return rejectWithValue(null)
//         } finally {
//             dispatch(appActions.setInitializedAC({value: true}))
//         }
//     }
// )
