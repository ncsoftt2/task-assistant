import {handleServerError} from "common/utils";
import {LoginPayloadType} from "features/auth/api/authApi.types";
import {authAPI} from "features/auth";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk} from "common/utils/createAsyncThunkApp";
import {UserDataType} from "features/auth/model/slice/auth.reducer";

export const login = createAppAsyncThunk<UserDataType, LoginPayloadType>(
    'auth/login',
    async (payload, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        const res = await authAPI.login(payload)
        if (res.data.resultCode === ResultCode.SUCCESS) {
            return {email: payload.email}
        } else {
            const isShowAppError = !res.data.fieldsErrors.length
            handleServerError(res.data, dispatch, isShowAppError)
            return rejectWithValue(res.data)
        }
    }
)