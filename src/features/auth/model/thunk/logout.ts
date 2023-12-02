import {handleServerError} from "common/utils";
import {clearDataAC} from "common/actions/clearData";
import {authAPI} from "features/auth";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";
import {appActions} from "app/app.reducer";

export const logout = createAppAsyncThunk<undefined, undefined>(
    'auth/logout',
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        const response = await authAPI.logout()
        if (response.data.resultCode === ResultCode.SUCCESS) {
            dispatch(appActions.setInitializedAC({value: false}))
            dispatch(clearDataAC())
        } else {
            handleServerError(response.data, dispatch)
            return rejectWithValue(null)
        }
    }
)
