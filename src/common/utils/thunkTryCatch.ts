import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {AppDispatch, AppState} from "app/store";
import {BaseResponseType} from "common/types";
import {appActions} from "app/app.reducer";
import {handleNetworkError} from "common/utils/handleNetworkError";


export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppState, unknown, AppDispatch, null | BaseResponseType>,
    logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    try {
        return await logic();
    } catch (e) {
        handleNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatusAC({ status: "idle" }));
    }
};
