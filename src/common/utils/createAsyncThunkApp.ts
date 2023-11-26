import {AppDispatch, AppState} from "app/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BaseResponseType} from "common/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState
    dispatch: AppDispatch
    rejectValue: null | BaseResponseType
}>();