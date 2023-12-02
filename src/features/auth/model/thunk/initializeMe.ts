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
