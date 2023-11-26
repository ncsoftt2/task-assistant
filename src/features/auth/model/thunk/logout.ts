import {handleServerError} from "common/utils";
import {clearDataAC} from "common/actions/clearData";
import { authAPI } from "features/auth";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";
import {appActions} from "app/app.reducer";
import {thunkTryCatch} from "common/utils/thunkTryCatch";

export const logout = createAppAsyncThunk<undefined,undefined>(
    'auth/logout',
    async (_,thunkAPI) => {
        const {dispatch,rejectWithValue} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const response = await authAPI.logout()
            if(response.data.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setAppStatusAC({status:'succeeded'}))
                dispatch(appActions.setInitializedAC({value:false}))
                dispatch(clearDataAC())
            } else {
                handleServerError(response.data,dispatch)
                return rejectWithValue(null)
            }
        })
    }
)
// export const logout = createAppAsyncThunk<undefined,undefined>(
//     'auth/logout',
//     async (_,{dispatch,rejectWithValue}) => {
//         dispatch(appActions.setAppStatusAC({status:'loading'}))
//         try {
//             const response = await authAPI.logout()
//             if(response.data.resultCode === ResultCode.SUCCESS) {
//                 dispatch(appActions.setAppStatusAC({status:'succeeded'}))
//                 dispatch(appActions.setInitializedAC({value:false}))
//                 dispatch(clearDataAC())
//             } else {
//                 handleServerError(response.data,dispatch)
//                 return rejectWithValue(null)
//             }
//         } catch (e) {
//             const err = e as {message: string}
//             handleNetworkError(err,dispatch)
//             return rejectWithValue(null)
//         }
//     }
// )
